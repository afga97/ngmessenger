import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInterface } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friends: UserInterface[];
  friend: UserInterface
  date = Date.now()

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.friendId = this.activatedRoute.snapshot.params.uid
    this.friends = userService.getFriends()
    this.friend = this.friends.find(x => x.uid == this.friendId)
  }

  ngOnInit() {
  }

}
