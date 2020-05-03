export class User {
    email?: string;
    gender?: string;
    id?: string;
    imageUrl?: string;
    profile?: string;


  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

}
