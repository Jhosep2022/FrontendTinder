import {Component, Output, EventEmitter, ViewChild, ElementRef, Input, OnInit, OnDestroy} from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { Profile } from 'src/app/models/profile';
import { Message } from 'src/app/models/message';
import {FormControl} from "@angular/forms";
import {MessageWsDto} from "../../models/message.ws.dto";
import {AwsWebSocketService} from "../../services/aws.web-socket.service";
import {AwsHttpService} from "../../services/aws-http.service";
import {KeycloakService} from "keycloak-angular";
import {MatchService} from "../../services/match.service";
import {ProfileService} from "../../services/profile.service";
import {Match} from "../../models/match";
import {FileService} from "../../services/file-service.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Output() chatSelected = new EventEmitter<Chat>();
  @Output() viewChange = new EventEmitter<'profile' | 'display' | 'chat' | 'home' | 'register' | 'ocupation'>();

constructor(
  private awsHttpService: AwsHttpService, private matchService: MatchService, private keycloakService: KeycloakService, private profileService: ProfileService, private fileService: FileService,
    private awsWebSocketService: AwsWebSocketService,
) {}

  selectedChat: Chat | null = null;
  chats: Chat[] = [];
  profile: Profile | null = null;
  matches: Match[] = [];
  profilePhoto: string | null = null;
  hasFinishedLoading: boolean = false;
    ownProfile: Profile | null = null;

  ngOnInit(): void {
      var sender = this.keycloakService.getKeycloakInstance().idTokenParsed?.['preferred_username'];
      this.profileService.getProfileByNickname(sender).subscribe({
          next: (responseDto) => {
              this.ownProfile = responseDto.data;
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
                        this.matches = myMatches;
                        this.matches.forEach((match) => {
                            // console.log((this.ownProfile?.profileId === match.profile1Id) ? match.profile2Id : match.profile1Id);
                            this.profileService.getProfileById((this.ownProfile?.profileId === match.profile1Id) ? match.profile2Id : match.profile1Id).subscribe({
                                next: (responseDto) => {
                                    this.profile = responseDto.data;
                                    this.fileService.getFileUrlById(responseDto.data.photos.split(',')[0]).subscribe({
                                        next: (url) => {
                                            this.profilePhoto = url.data;
                                            this.awsHttpService.getMessagesBySenderAndReceiver(sender, responseDto.data.nickname).subscribe({
                                                next: (messages) => {
                                                    var message: Message = {
                                                        messageId: 1,
                                                        profileId: 1,
                                                        chatId: 1,
                                                        content: (messages.length > 0) ? messages[messages.length - 1].message : 'No tienes mensajes con este usuario',
                                                        timeMessage: (messages.length > 0) ? new Date(messages[messages.length - 1].dateTime) : new Date(),
                                                    }
                                                    this.chats.push({
                                                        id: responseDto.data.profileId.toString(),
                                                        userIds: [this.matches[0].profile1Id.toString(), this.matches[0].profile2Id.toString()],
                                                        users: [this.profile!],
                                                        messages: [message],
                                                        chatPic: url.data,
                                                        chatName: responseDto.data.nickname,
                                                        lastMessage: message.content,
                                                    });
                                                    this.hasFinishedLoading = true;
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
                                },
                                error: (error) => {
                                    console.error(error);
                                }
                            });
                        });
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







  setActiveChat(chat: Chat): void {
    this.selectedChat = chat;
    this.chatSelected.emit(chat);
  }
}
