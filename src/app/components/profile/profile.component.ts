import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {Profile} from "../../models/profile";
import {ProfileService} from "../../services/profile.service";
import {KeycloakService} from "keycloak-angular";
import {FileService} from "../../services/file-service.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  @Output() editProfile = new EventEmitter<void>();
  myProfile: Profile | undefined;
  myProfilePicture: string = '';
  firstName: string = '';
    lastName: string = '';

  constructor(private profileService: ProfileService, private keycloakService: KeycloakService, private fileService: FileService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const username = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];
    this.firstName = this.keycloakService.getKeycloakInstance().idTokenParsed?.['given_name'];
    this.lastName = this.keycloakService.getKeycloakInstance().idTokenParsed?.['family_name'];
    this.profileService.getProfileByNickname(username).subscribe((response) => {
      this.myProfile = response.data;
        this.fileService.getFileUrlById(this.myProfile?.photos).subscribe((response) => {
            this.myProfilePicture = response.data;
        });
    });
  }

  onEdit(): void {
    this.editProfile.emit();
  }


  username = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];

  onLogout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: '¿Esta seguro que desea cerrar sesión?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.keycloakService.logout('http://localhost:4200/');
      }
    });
  }
}

