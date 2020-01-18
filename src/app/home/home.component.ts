import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { RequestsService } from '../services/requests.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends : UserInterface[] = [];
  query: string = '';
  closeResult: string;
  friendEMail: string = '';
  user: any;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private requestService: RequestsService,
    private modalService: NgbModal
  ) {
    this.userService.getUsers().valueChanges().subscribe( (data: UserInterface[]) => {
      this.friends = data
    }, (error) => {
      console.log(error)
    })
    this.authenticationService.getStatus().subscribe( (status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe( (user) => {
        this.user = user
        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends);
        }
      }, (error) => {
        console.log(error)
      })
    })
  }

  ngOnInit() {
  }

  async logOut() {
    try{
      await this.authenticationService.logOut()
      this.router.navigate(['login'])
    }catch(error){
      console.log(error)
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {});
  }

  sendRequest(){
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEMail,
      sender: this.user.uid,
      status: 'pending'
    }
    this.requestService.createRequest(request).then( () => {
      alert('Solicitud Enviada')
    }).catch( (error) => {
      alert('Ocurrio un error')
      console.log(error);
    })
  }



}
