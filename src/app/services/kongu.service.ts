import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../configuration/app.constants';
import { User } from '../_models/User';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KonguService {

  private URL = 'https://kmat.herokuapp.com';

  constructor(private _http: HttpClient) { }
  register(user: User) {
    return this._http.post(this.URL + `/signUp`, user);
  }

  login(userId: string, passowrd: string) {
    return this._http.post(this.URL + `/signIn`, { username: userId, passowrd: passowrd });
  }
}
