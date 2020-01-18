import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserInterface } from '../interfaces/user-interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() uid: string;
  contact: UserInterface
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserById(this.uid).valueChanges().subscribe( (data:UserInterface) => {
      this.contact = data
    })
  }

}
