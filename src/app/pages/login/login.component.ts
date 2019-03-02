import { Component, OnInit } from '@angular/core';
import { KonguService } from '../../../app/_services/kongu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';

import * as $ from 'jquery';

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

  constructor(
    private _service: KonguService,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }



  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this._activateRoute.snapshot.queryParams['returnUrl'] || '/profile';

    this.loginForm = this.formBuilder.group({
      emailMobile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

    $(document).ready(function () {
      $('#forgotPWFrm').hide();

      $('#forgot').click(function () {
        $('#loginFrm').hide();
        $('#forgotPWFrm').show();
        // alert('test');
      });
    });
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.submitted = true;
    // console.log(this.registerForm.value);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._service.login(this.loginForm.value.emailMobile, this.loginForm.value.password).subscribe(
      userData => {

        console.log('Login successful :: ', userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this._router.navigate([this.returnUrl]);
        // this.alertService.success('Registration successful', true);
        // this.router.navigate(['/login']);
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
