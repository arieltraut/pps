import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { Plugins } from '@capacitor/core';


function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  form: FormGroup;
  type;

  constructor(private database: DatabaseService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private route: ActivatedRoute,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('type')) {
        this.navCtrl.navigateBack('/gallery');
        return;
      }
      this.type = paramMap.get('type');
    });

    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      // description: new FormControl(null, {
      //   updateOn: 'blur',
      //   validators: [Validators.required, Validators.maxLength(180)]
      // }),
      // location: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null)
    });
  }


  onImagePicked(imageData: string | File) {
    console.log('valor form' + this.form);
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        alert(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }


  onCreatePost() {
    if (!this.form.valid || !this.form.get('image').value) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Subiendo foto...'
      })
      .then(loadingEl => {
        loadingEl.present();

        const imgToUpload = this.form.get('image').value;
        imgToUpload.name = 'picbild-' + new Date().toDateString;

        const uploadTask = this.database.uploadImage(imgToUpload);
        uploadTask.task.on('state_changed', (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');

        }, (error) => {
          // Handle unsuccessful uploads

        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);

            Plugins.Storage.get({ key: 'user-bd' }).then(
              (userData) => {
                this.database.AgregarUno(JSON.parse(JSON.stringify(
                  new Post({
                    date: new Date(),
                    imageUrl: downloadURL,
                    title: this.form.value.title,
                    type: this.type,
                    user: JSON.parse(userData.value),
                    votes: []
                  }))), 'picbild-posts').then(() => {
                    loadingEl.dismiss();
                    this.form.reset();
                    this.router.navigate(['/list', this.type]);
                  });
              }, () => {
                this.navCtrl.navigateBack('');
              }
            );
          });
        });
      });
  }
}
