import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { ReactionService } from 'src/app/services/reaction.service.service';
import {KeycloakService} from "keycloak-angular";
import {FileService} from "../../services/file-service.service";

@Component({
  selector: 'app-prifle-display',
  templateUrl: './prifle-display.component.html',
  styleUrls: ['./prifle-display.component.css']
})
export class PrifleDisplayComponent implements OnInit {
  currentProfileIndex: number = 0;
  profiles: Profile[] = [];
  currentUserProfileId: number = 0;

  constructor(
    private profileService: ProfileService,
    private reactionService: ReactionService,
    private keycloakService: KeycloakService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    const sender = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];
    this.profileService.getAllProfiles().subscribe(profiles => {
      this.profiles = profiles.data;
      this.profiles.map((profile) => {
        if (profile.nickname === sender) {
          this.currentUserProfileId = profile.profileId;
        } else {
            this.fileService.getFileUrlById(profile.photos).subscribe(response => {
                profile.photos = response.data;
            });
        }
      });
      // delete the current user profile from the list
      this.profiles = this.profiles.filter(profile => profile.profileId !== this.currentUserProfileId);
    }
    );
    }

  onReact(isLike: boolean): void {
    if (this.currentProfileIndex < this.profiles.length) {
      const currentProfile = this.profiles[this.currentProfileIndex];
      this.reactionService.postReaction(this.currentUserProfileId, currentProfile.profileId, isLike).subscribe({
        next: () => {
          console.log('Reacción enviada para el perfil:', currentProfile.profileId);
          this.currentProfileIndex++;
        },
        error: error => {
          console.error('Error al enviar la reacción:', error);
        }
      });
    }
  }

  getCurrentProfile(): Profile | null {

    return this.profiles.length > this.currentProfileIndex ? this.profiles[this.currentProfileIndex] : null;
  }
}
