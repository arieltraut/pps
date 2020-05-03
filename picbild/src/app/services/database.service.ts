import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  constructor( private afs: AngularFirestore, private storage: AngularFireStorage ) {}


  TraerTodos(collection): Observable<any[]> {
    return this.afs.collection<any>(collection).valueChanges()
    .pipe (res => res );
  }


  TraerTodos2(collection) {  // no trae a tiempo, reemplazada por traertodos
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(collection).valueChanges().subscribe(snapshots => {
        resolve(snapshots);
      });
    });
  }


  TraerUno(collection, id) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(`${collection}`).doc(id).valueChanges().subscribe(snapshots => {
        resolve(snapshots);
      });
    });
  }


  AgregarUno(objeto: any, collection: string) {
    let id;
    if (objeto.id) {
      id = objeto.id;
    } else {
      id = this.afs.createId();
      objeto.id = id;
    }
    return this.afs.collection(collection).doc(id).set(objeto);

    // this.afs.collection(collection).add(objeto);
    // .doc().set(objeto);
  }


  ModificarUno(objeto: any, collection: string) {
    const id = objeto.id;
    const objetoDoc = this.afs.doc<any>(`${collection}/${id}`);
    return objetoDoc.update(objeto);
  }


  BorrarUno(id: any, collection: string) {
    const objetoDoc = this.afs.collection(`${collection}`).doc(id);
    return objetoDoc.delete();
  }


  uploadImage(image: File) {
    // The storage ref
    const storageRef = this.storage.ref('picbild-img/' + image.name);

    // Upload the file
    const uploadTask = storageRef.put(image);

    return uploadTask;
  }







}
