import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserInterface } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserInterface;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private firebaseStorage: AngularFireStorage
  ) {
    this.authenticationService.getStatus().subscribe((data) => {
      this.userService.getUserById(data.uid).valueChanges().subscribe((profile: UserInterface) => {
        this.user = profile
      }, (error) => {
        console.log(error)
      })
    }, (error) => {
      console.log(error)
    })
  }

  ngOnInit() {
  }

  saveSettings() {
    if (this.croppedImage){
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/'+ currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then(() => {
        this.picture = this.firebaseStorage.ref('pictures/'+ currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe( (p) => {
          this.userService.setAvatar(p, this.user.uid).then( () => {
            alert('Avatar subido correctamente')
          }).catch((error) => {
            alert('Ocurrio un error al subir la imagen')
            console.log(error)
          })
        })
      }, (error) => {
        console.log(error)
      })
    }else {
      this.userService.editUser(this.user).then(() => {
        alert('Información actualizada correctamente')
      }).catch((error) => {
        alert(error)
      })
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}
