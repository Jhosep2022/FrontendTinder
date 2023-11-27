import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {NewUser} from "../../models/NewUser";
import {KeycloakService} from "keycloak-angular";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileService} from "../../services/file-service.service";
import {Profile} from "../../models/profile";

@Component({
  selector: 'app-register-update',
  templateUrl: './register-update.component.html',
  styleUrls: ['./register-update.component.css']
})
export class RegisterUpdateComponent implements OnInit {
  about: string = '';
  photo: File | null = null;
  myProfile: Profile | null = null;

  constructor(private profileService: ProfileService, private keycloakService: KeycloakService, private _snackBar: MatSnackBar,
              private fileService: FileService) {
  }

  onRegister() {
    // upload photo
    if (this.photo !== null) {
        this.fileService.uploadFile(this.photo,"profileimage").subscribe({
            next: (responseDto) => {
                console.log(responseDto);
                this.profileService.updateProfile(this.myProfile!.profileId, this.about, responseDto.data.s3ObjectId.toString()).subscribe({
                    next: (responseDto) => {
                        console.log(responseDto);
                        this._snackBar.open('Registro exitoso', 'Cerrar', {
                            duration: 1000,
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                        });
                        // reload page
                        window.location.reload();
                    }
                })

            },
            error: (error) => {
                console.log(error);
            }
        })
        }
    }




    ngOnInit(): void {
    const sender = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];
    this.profileService.getProfileByNickname(sender).subscribe(profile => {
      this.myProfile = profile.data;
      this.about = this.myProfile.description;
      // this.fileService.getFileUrlById(this.myProfile.photos).subscribe(response => {
      //   this.myProfile.photos = response.data;
      // });
    });
    }

  uploadPhoto(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.photo = files[0];
    }
  }

}
