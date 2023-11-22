export class Match {
  matchId: number;
  profile1Id: number;
  profile2Id: number;
  dateMatch: Date;

  constructor(matchId: number, profile1Id: number, profile2Id: number, dateMatch: Date) {
      this.matchId = matchId;
      this.profile1Id = profile1Id;
      this.profile2Id = profile2Id;
      this.dateMatch = dateMatch;
  }
}
