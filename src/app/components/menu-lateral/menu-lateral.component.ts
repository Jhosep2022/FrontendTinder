// menu-lateral.component.ts
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat';
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../models/profile";
import {FileService} from "../../services/file-service.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
    view: 'Match' | 'Chat' = 'Match';
    @Output() viewChange = new EventEmitter<'profile' | 'display' | 'chat' | 'home' | 'ocupation'>();
    @Output() chatSelected = new EventEmitter<Chat>();
    myProfile: Profile | null = null;
    myProfilePicture: string | null = null;
    firstName = this.keycloakService.getKeycloakInstance().idTokenParsed?.['given_name'];
    lastName = this.keycloakService.getKeycloakInstance().idTokenParsed?.['family_name'];


    constructor(private router: Router, private profileService: ProfileService, private fileService: FileService, private keycloakService: KeycloakService) {
    }

    ngOnInit(): void {
        const sender = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];
        console.log(sender);
        this.profileService.getProfileByNickname(sender).subscribe({
            next: (responseDto) => {
                this.myProfile = responseDto.data;
                const photos = this.myProfile?.photos!;
                const photosArray = photos.split(",");
                this.fileService.getFileUrlById(photosArray[0]).subscribe({
                    next: (responseDto) => {
                        this.myProfilePicture = responseDto.data;
                    }
                });
            }
        });
        this.viewChange.emit('display');

    }


  emitViewChange(view: 'profile' | 'display' | 'chat' | 'home'| 'ocupation') {
    console.log(view);
    this.viewChange.emit(view);
  }

  updateView(newView: 'Match' | 'Chat') {
    this.view = newView;
  }

  onChatSelected(chat: Chat) {
    this.chatSelected.emit(chat);
  }

  goToProfile() {
    this.router.navigateByUrl('/profile'); // Use navigateByUrl for absolute paths
  }

  goToHome() {
    this.router.navigateByUrl('/home'); // Use navigateByUrl for absolute paths
  }



}
