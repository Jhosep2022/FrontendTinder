import { Component } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {NewUser} from "../../models/NewUser";
import {KeycloakService} from "keycloak-angular";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  about: string = '';
  age!: number;
  genero: string = '';
  photo: File | null = null;

  constructor(private profileService: ProfileService, private keycloakService: KeycloakService, private _snackBar: MatSnackBar) {
  }

  onRegister() {
    // angular material popup
    if (this.about === '' || this.age === undefined || this.genero === '' || this.photo === null) {
      this._snackBar.open('Por favor, llene todos los campos', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }
    console.log('About: ' + this.about);
    console.log('Age: ' + this.age);
    console.log('Genero: ' + this.genero);
    console.log('Photo: ' + this.photo!.name);
    console.log('Form submitted');
    const firstName = this.keycloakService.getKeycloakInstance().idTokenParsed?.['given_name'];
    const lastName = this.keycloakService.getKeycloakInstance().idTokenParsed?.['family_name'];
    const email = this.keycloakService.getKeycloakInstance().idTokenParsed?.['email'];
    const username = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];


          var newUser: NewUser = {
            occupationId: 1,
            wantId: 1,
            preferencesId: 1,
            description: this.about,
            firstname: firstName,
            lastname: lastName,
            nickname: username,
            email: email,
            password: '123456',
            gender: this.genero,
            age: this.age,
            file: this.photo!
      }
        this.profileService.createProfile(newUser).subscribe({
            next: (responseDto) => {
                console.log(responseDto);
                this._snackBar.open('Registro exitoso', 'Cerrar', {
                    duration: 1000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
                // reload page
                window.location.reload();
            },
            error: (error) => {
                console.log(error);
            }
        })
  }

  uploadPhoto(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.photo = files[0];
    }
  }

}
