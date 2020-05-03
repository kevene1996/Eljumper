import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from 'src/app/interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  createUser(user: IUser) {
    console.log(user, 'user in service');
    return this.firestore.collection('users').add(user);
}
}
