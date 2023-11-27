// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import {ResponseDto} from "../models/response.dto";
import {NewUser} from "../models/NewUser";
import { environment } from 'src/environments/environment.docker';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = `${environment.API_URL}/ms-profile/api/v1/profile`;
  private registerUrl = `${environment.API_URL}/ms-profile/api/v1/people`;

  constructor(private http: HttpClient) { }

    createProfile(newUser: NewUser): Observable<ResponseDto<Profile>> {
      const formData: FormData = new FormData();
        formData.append('occupationId', newUser.occupationId.toString());
        formData.append('wantId', newUser.wantId.toString());
        formData.append('preferencesId', newUser.preferencesId.toString());
        formData.append('description', newUser.description);
        formData.append('firstname', newUser.firstname);
        formData.append('lastname', newUser.lastname);
        formData.append('nickname', newUser.nickname);
        formData.append('email', newUser.email);
        formData.append('password', newUser.password);
        formData.append('gender', newUser.gender);
        formData.append('age', newUser.age.toString());
        formData.append('file', newUser.file);
        return this.http.post<ResponseDto<Profile>>(`${this.registerUrl}/register`, formData);
    }

  getProfileByNickname(nickname: string): Observable<ResponseDto<Profile>> {
    return this.http.get<ResponseDto<Profile>>(`${this.baseUrl}/nickname/${nickname}` ); //{ headers: this.getAuthHeaders() }
  }

  getAllProfiles(): Observable<ResponseDto<Profile[]>> {
    return this.http.get<ResponseDto<Profile[]>>(`${this.baseUrl}/all`);//, { headers: this.getAuthHeaders() }
  }

  getProfileById(profileId: number): Observable<ResponseDto<Profile>> {
    return this.http.get<ResponseDto<Profile>>(`${this.baseUrl}/${profileId}`);//, { headers: this.getAuthHeaders() }
  }

  updateProfile(profileId: number, description: string, photos: string): Observable<ResponseDto<Profile>> {
    const body = { description, photos };
    return this.http.put<ResponseDto<Profile>>(`${this.baseUrl}/update/${profileId}`, body);//, { headers: this.getAuthHeaders() }
  }
}
