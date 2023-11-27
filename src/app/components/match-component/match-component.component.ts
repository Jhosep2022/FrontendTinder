import {Component, Input, OnInit} from '@angular/core';
import { Match } from 'src/app/models/match';
import { ProfileService } from 'src/app/services/profile.service';
import {Profile} from "../../models/profile";
import {FileService} from "../../services/file-service.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-match-component',
  templateUrl: './match-component.component.html',
  styleUrls: ['./match-component.component.css']
})
export class MatchComponentComponent implements OnInit {
    @Input() item?: Match;

    matchProfile: Profile | null = null;
    matchProfileNickname: string | null = null;
    matchProfilePhoto: string | null = null;
    myProfile: Profile | null = null;


    constructor(private profileService: ProfileService, private fileService: FileService, private keycloakService: KeycloakService) {
    }

    ngOnInit(): void {
        const sender = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];
        this.profileService.getProfileByNickname(sender).subscribe({
            next: (responseDto) => {
                this.myProfile = responseDto.data;
                this.profileService.getProfileById((this.myProfile.profileId === this.item!.profile1Id) ? this.item!.profile2Id : this.item!.profile1Id).subscribe({
                    next: (responseDto) => {
                        this.matchProfile = responseDto.data;
                        this.matchProfileNickname = this.matchProfile.nickname;
                        const photosArray = this.matchProfile.photos.split(',');
                        this.fileService.getFileUrlById(photosArray[0]).subscribe({
                            next: (responseDto) => {
                                this.matchProfilePhoto = responseDto.data;
                            },
                            error: (error) => {
                                console.error(error);
                            }
                        });
                    },
                    error: (error) => {
                        console.error(error);
                    }
                });
            }
        });
    }


  getProfileImageUrl(match: Match): string {
    return this.matchProfilePhoto!;
  }

  getProfileNickname(match: Match): string {
    return this.matchProfileNickname!;
  }

}
