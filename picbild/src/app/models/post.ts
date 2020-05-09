
// export class Post {
//   constructor(
//     public id: string,
//     public imageUrl: string,
//     public title: string,
//     public type: string,
//     public user: string,
//     public votes: string[]
//   ) {}
// }

import { User } from './user';



export class Post {
    public date?: Date;
    public id?: string;
    public imageUrl?: string;
    public title?: string;
    public type?: string;
    public user?: User;
    public votes?: string[];


    constructor(init?: Partial<Post>) {
        Object.assign(this, init);
    }
}
