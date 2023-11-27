export class Profile {
  profileId: number;
  peopleId: number;
  occupationId: number;
  wantId: number;
  preferenceId: number;
  nickname: string;
  description: string;
  status: boolean;
  photos: string;

  constructor(profileId: number, peopleId: number, occupationId: number, wantId: number, preferenceId: number, nickname: string, description: string, status: boolean, photos: string) {
      this.profileId = profileId;
      this.peopleId = peopleId;
      this.occupationId = occupationId;
      this.wantId = wantId;
      this.preferenceId = preferenceId;
      this.nickname = nickname;
      this.description = description;
      this.status = status;
        this.photos = photos;
  }
}
