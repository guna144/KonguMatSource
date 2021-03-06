import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private serviceURL = 'https://kmat.herokuapp.com';

  constructor(private http: HttpClient) { }

  login(emailMobile: string, password: string) {
    return this.http.post<any>(this.serviceURL + `/signIn`, { mobile: emailMobile, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        console.log('user :: ', user);
        // console.log('user token :: ', user.token);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
