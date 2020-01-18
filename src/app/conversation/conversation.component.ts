import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInterface } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  shake:boolean = false;
  friendId: any;
  friend: UserInterface
  date = Date.now()
  showEmojiPicker: boolean = false
  message: string = ""
  messages = [];
  user: UserInterface
  conversation_id: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService
  ) {
    this.friendId = this.activatedRoute.snapshot.params.uid
    
    this.authenticationService.getStatus().subscribe( (session) => {
      this.userService.getUserById(session.uid).valueChanges().subscribe( (user: UserInterface) => {
        this.user = user
        this.userService.getUserById(this.friendId).valueChanges().subscribe( (data: UserInterface) => {
          this.friend = data
          const ids = [ this.user.uid, this.friend.uid].sort()
          this.conversation_id = ids.join('|');
          this.getConversation()
        }, (error) => {
          console.log(error)
        })
      })
    })
    // this.friends = userService.getFriends()  
    // this.friend = this.friends.find(x => x.uid == this.friendId)
    this.messages = [ { 
      from: 'him',
      message: 'Hola'
    },{
      from: 'me',
      message: 'Bien'
    } ]
  }

  ngOnInit() {
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    const { message } = this;
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    this.showEmojiPicker = false;
  }

  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.message,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text'
    }
    this.conversationService.createConversation(message).then( () => {
      this.message = '';
    })
  }

  getConversation(){
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe( (data) => {
      this.messages = data;
      this.messages.forEach( (msg) => {
        if (!msg.seen){
          msg.seen = true;
          this.conversationService.editConversation(msg)
          if (msg.type == 'text') {
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();
          } else if (msg.type == 'zumbido'){
            this.doZumbido();
          }
        }
      })
    }, (error) => {
      console.log(error)
    })
  }

  sendZumbido() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    }
    this.conversationService.createConversation(message).then( () => {})
    this.doZumbido();
  }

  doZumbido(){
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout( () => {
      this.shake = false;
    }, 1000)
  }

}
