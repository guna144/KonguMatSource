import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../configuration/app.constants';
import { User } from '../_models/User';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KonguService {

  private serviceURL = 'http//localhost:9090';

  constructor(private _http: HttpClient) { }
  register(user: User) {
    return this._http.post(this.serviceURL + `/signUp`, user);
  }

  login(userId: string, password: string) {
    console.log('Test data in service', userId, password);
    return this._http.post(this.serviceURL + `/signIn`, { mobile: userId, password: password });
  }
}
