import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../configuration/app.constants';
import { User } from '../_models/User';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KonguService {

  private serviceURL = 'https://kmat.herokuapp.com';

  constructor(private _http: HttpClient) { }

  register(regJSON: any) {
    return this._http.post(this.serviceURL + `/saveData`, regJSON);
  }

  login(userId: string, password: string) {
    console.log('Test data in service', userId, password);
    return this._http.post(this.serviceURL + `/signIn`, { mobile: userId, password: password });
  }

  emailCheckService(emailId: string) {
    return this._http.get(this.serviceURL + `/emailCheck/` + emailId);
  }

  mobileCheckService(mobile: string) {
    return this._http.get(this.serviceURL + `/mobileCheck/` + mobile);
  }

  profileUpdate(profileJSON: any) {
    return this._http.post(this.serviceURL + `/saveProfile`, profileJSON);
  }

  imageSave(profileId: string) {
    profileId = '5c8ce8270ccfe6adf3a4902a';
    return this._http.post('https://kmat.herokuapp.com/saveFile/', profileId);
  }



}
