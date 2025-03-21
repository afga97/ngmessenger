import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation:string = 'login'
  email: string = '';
  password: string = '';
  nick: string = '';
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login(){
    try{
      await this.authenticationService.loginWithEmail(this.email, this.password)
      this.router.navigate(['home'])
    }catch(error){
      console.log(error)
    }
  }

  async register(){
    this.authenticationService.registerWithEmail(this.email, this.password)
      .then( (data) => {
        const user = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick
        }
        this.userService.createUser(user).then( (response) => {
          console.log(response)
        }).catch( (error) => {
          console.log(error)
        })
      }).catch( (error) => {
        console.log(error)
      })
  }

}
