import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Configuration } from '../configuration/app.constants';
import { User } from '../_models/user';
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

  fileUpload(file: File, profileId: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('profileId', profileId);
    const req = new HttpRequest('POST', this.serviceURL + '/saveFile/', formdata, { reportProgress: true, responseType: 'text' });
    return this._http.request(req);
  }

  getImages(profileId: string) {
    return this._http.get(this.serviceURL + '/getImages/' + profileId);
  }


}
