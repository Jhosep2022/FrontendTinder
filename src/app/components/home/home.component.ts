// home.component.ts
import {Component, OnInit} from '@angular/core';
import { Chat } from 'src/app/models/chat';
import {Router} from "@angular/router";
import {ProfileService} from "../../services/profile.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  currentView: 'profile' | 'display' | 'chat' | 'register' | 'ocupation' |'home' | 'register-new'  | null = null;
  activeChat: Chat | null = null;
  selectedNickname: string | null = null;
    isAdmin: boolean = false;
  onViewChange(view: 'profile' | 'display' | 'chat' | 'home' | 'register' | 'ocupation') {
    console.log("Cambiando vista a:", view);
    if (view === 'home') {
      this.currentView = 'display';
    } else {
      this.currentView = view;
    }
    switch (view) {
        case 'profile':
            this.router.navigate(['/profile']);
            break;
        case 'display':
            this.router.navigate(['/home']);
            break;
        case 'chat':
            this.router.navigate(['/chat']);
            break;
        case 'home':
            this.router.navigate(['/home']);
            break;
        case 'register':
            this.router.navigate(['/register']);
            break;
        case 'ocupation':
            this.router.navigate(['/occupation']);
            break;
    }
  }

  constructor(private router: Router, private profileService: ProfileService, private keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
      var roles = this.keycloakService.getUserRoles();
        if (roles.includes("ADMIN")) {
            this.isAdmin = true;
        }

      const sender = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];
   console.log(sender);
    this.profileService.getProfileByNickname(sender).subscribe({
      next: (responseDto) => {
        if (responseDto.data === null) {
          this.currentView = 'register-new';
        }
        var flag = false;

          if (responseDto.data.nickname === sender) {
            flag = true;
            this.currentView = 'display';
            this.selectedNickname= sender;
          }
            this.currentView = (flag) ? 'display' : 'register-new';
      },
        error: (error) => {
            console.error(error);
            this.currentView = 'register-new';
        }
    })
  }

  onEditProfile(): void {
    this.currentView = 'register';
  }

  onChatSelected(chat: Chat) {
    this.activeChat = chat;
    this.currentView = 'chat';
  }
}
