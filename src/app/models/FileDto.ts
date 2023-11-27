export class FileDto {
  readonly s3ObjectId: number;
  readonly contentType: string;
  readonly bucket: string;
  readonly filename: string;
  readonly status: boolean;

  constructor(s3ObjectId: number, contentType: string, bucket: string, filename: string, status: boolean) {
      this.s3ObjectId = s3ObjectId != null ? s3ObjectId : 0;
      this.contentType = contentType != null ? contentType : "";
      this.bucket = bucket != null ? bucket : "";
      this.filename = filename != null ? filename : "";
      this.status = status != null ? status : true;
  }
}
