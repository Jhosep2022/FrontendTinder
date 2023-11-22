export class Reaction {
  reactionId: number;
  emitterId: number;
  catcherId: number;
  islike: boolean;
  likeTime: Date;  

  constructor(reactionId: number, emitterId: number, catcherId: number, islike: boolean, likeTime: Date) {
      this.reactionId = reactionId;
      this.emitterId = emitterId;
      this.catcherId = catcherId;
      this.islike = islike;
      this.likeTime = likeTime;
  }
}
