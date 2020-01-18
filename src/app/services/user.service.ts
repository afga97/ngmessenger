import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  friends: UserInterface[];

  constructor(
    private angularFireDatabase: AngularFireDatabase
  ) { }

  getUsers(){
    return this.angularFireDatabase.list('/users')
  }

  getUserById(uid){
    return this.angularFireDatabase.object('/users/'+uid)
  }

  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  
  editUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  setAvatar(avatar, uid){
    return this.angularFireDatabase.object('/users'+ uid+ '/avatar').set(avatar)
  }

  addFriend(userId, friendId){
    this.angularFireDatabase.object('users/' + userId + '/friends/' + friendId).set(friendId)
    return this.angularFireDatabase.object('users/' + friendId + '/friends/' + userId).set(userId)
  }

  // getFriends(){
  //   return this.friends;
  // }

}

// let myUser: UserInterface = {
//   nick: 'Andres Giraldo',
//   subnick: 'Hola',
//   age: 20,
//   email: 'andres.giraldo@gmail.com',
//   friend: true,
//   uid: 1
// }
// let myUser2: UserInterface = {
//   nick: 'Felipe',
//   subnick: 'Hola',
//   age: 20,
//   email: 'asdasdasdasd',
//   friend: true,
//   uid: 2
// }
// let myUser3: UserInterface = {
//   nick: 'Giraldo',
//   subnick: 'Hola',
//   age: 20,
//   email: 'asdasdasdasd',
//   friend: false,
//   uid: 3
// }
// let myUser4: UserInterface = {
//   nick: 'Agudelo',
//   subnick: 'Hola',
//   age: 20,
//   email: 'asdasdasdasd',
//   friend: false,
//   uid: 4
// }
// let myUser5: UserInterface = {
//   nick: 'Pepe',
//   subnick: 'Hola',
//   age: 20,
//   email: 'asdasdasdasd',
//   friend: true,
//   uid: 5
// }
