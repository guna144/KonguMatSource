import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';

import * as $ from 'jquery';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public forgotPasswordForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  message: any;

  constructor(
    private formBuilder: FormBuilder,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }



  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this._activateRoute.snapshot.queryParams['returnUrl'] || '/';
    console.log('this.url : ', this.returnUrl);
    this.loginForm = this.formBuilder.group({
      emailMobile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    $(document).ready(function () {
      $('#forgotPWFrm').hide();

      $('#forgot').click(function () {
        $('#loginFrm').hide();
        $('#forgotPWFrm').show();
        // alert('test');
      });
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.emailMobile.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        userData => {
          console.log('userData : ', userData);
          if (userData == null) {
            console.log('this message');
            this.message = 'Email / Mobile & password is incorrect';
          } else {
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this._router.navigate(['profile']);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  close() {
    $('#forgotPWFrm').hide();
    $('#loginFrm').show();
    this.loginForm = this.formBuilder.group({
      userid: '',
      password: ''
    });
  }

}
