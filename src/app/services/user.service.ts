import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  friends: UserInterface[];

  constructor() {
    let myUser: UserInterface = {
      nick: 'Andres',
      subnick: 'Hola',
      age: 20,
      email: 'asdasdasdasd',
      friend: true,
      uid: 1
    }
    let myUser2: UserInterface = {
      nick: 'Felipe',
      subnick: 'Hola',
      age: 20,
      email: 'asdasdasdasd',
      friend: true,
      uid: 2
    }
    let myUser3: UserInterface = {
      nick: 'Giraldo',
      subnick: 'Hola',
      age: 20,
      email: 'asdasdasdasd',
      friend: false,
      uid: 3
    }
    let myUser4: UserInterface = {
      nick: 'Agudelo',
      subnick: 'Hola',
      age: 20,
      email: 'asdasdasdasd',
      friend: false,
      uid: 4
    }
    let myUser5: UserInterface = {
      nick: 'Pepe',
      subnick: 'Hola',
      age: 20,
      email: 'asdasdasdasd',
      friend: true,
      uid: 5
    }
    this.friends = [myUser, myUser2, myUser3, myUser4, myUser5]
  }

  getFriends(){
    return this.friends;
  }

}
