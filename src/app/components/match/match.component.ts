import {Component, OnDestroy, OnInit} from '@angular/core';
import { Match } from 'src/app/models/match';
import { MatchService } from 'src/app/services/match.service';
import {KeycloakService} from "keycloak-angular";
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../models/profile";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, OnDestroy {
  matches: Match[] = [];
  currentLength: number = 0;
  ownProfile: Profile | null = null;
  private intervalId: any;
  constructor(private matchService: MatchService, private keycloakService: KeycloakService, private profileService: ProfileService) { }

  ngOnInit(): void {
    var sender = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];
    this.profileService.getProfileByNickname(sender).subscribe({
      next: (responseDto) => {
        this.ownProfile = responseDto.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.fetchMatches();
    this.intervalId = setInterval(() => this.fetchMatches(), 1000);
  }

  fetchMatches(): void {
    this.matchService.getAllMatches().subscribe({
      next: (responseDto) => {
        const uniqueMatches = new Set();
        const myMatches = responseDto.data.filter((match) => {
          const matchKey = [match.profile1Id, match.profile2Id].sort().join('-');
          if (uniqueMatches.has(matchKey)) {
            return false;
          } else {
            uniqueMatches.add(matchKey);
            return match.profile1Id === this.ownProfile?.profileId || match.profile2Id === this.ownProfile?.profileId;
          }
        });
        console.log(myMatches);
        // There are cases when there are repeated matches, so we filter them out


        if (myMatches.length > this.currentLength) {
          this.currentLength = responseDto.data.length;
          this.matches = myMatches;
          console.log("New match found!");
        } else {
            console.log("No new matches found...");
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);

    }


}
