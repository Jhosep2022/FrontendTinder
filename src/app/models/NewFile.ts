export class NewFile {
  readonly filename: string;
  readonly bucket: string;
  readonly contentType: string;

  constructor(filename: string, bucket: string, contentType: string) {
      this.filename = filename;
      this.bucket = bucket;
      this.contentType = contentType;
  }
}
