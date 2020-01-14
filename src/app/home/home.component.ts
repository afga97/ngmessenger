import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends : UserInterface[];
  query: string = '';

  constructor(private userService: UserService) {
    this.friends = userService.getFriends()
  }

  ngOnInit() {
  }

}
