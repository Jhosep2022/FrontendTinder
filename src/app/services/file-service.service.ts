import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileDto } from '../models/FileDto';
import {ResponseDto} from "../models/response.dto";
import { environment } from 'src/environments/environment.docker';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = `${environment.API_URL}/ms-file/api/v1/files`;

  constructor(private http: HttpClient) { }

  getFileUrlById(id: string): Observable<ResponseDto<string>> {
    return this.http.get<ResponseDto<string>>(`${this.baseUrl}/${id}`);
  }

  uploadFile(fileToUpload: File, bucketName: string): Observable<ResponseDto<FileDto>> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('bucket', bucketName);

    return this.http.post<ResponseDto<FileDto>>(`${this.baseUrl}`, formData);
  }
}
