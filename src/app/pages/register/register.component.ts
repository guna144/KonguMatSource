import { Component, OnInit } from '@angular/core';
import { KonguService } from '../../../app/_services/kongu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../app/_services/alert.service';
import { WindowRef } from '../../_services/WindowRef';
import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  agreeForm: FormGroup;
  paymentForm: FormGroup;
  loading = false;
  submitted = false;
  jsonObject: any = {};
  emailUsed: string;
  mobileUsed: string;
  rzp1: any;

  constructor(
    private _service: KonguService,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private winRef: WindowRef
  ) { }



  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      accFlag: true,
      role: 'admin'
    });

    this.agreeForm = this.formBuilder.group({

    });

    this.paymentForm = this.formBuilder.group({
      agreementFlag: ['', Validators.required],
      modeOfPayment: ['', Validators.required],
      membership: ['', Validators.required],
      chequeNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required]
    });

    $(document).ready(function () {
      $('#agreeForm').hide();
      $('#paymentFrm').hide();
      $('#offlineForm').hide();
      $('#onlineForm').hide();

      $('#next').click(function () {
        $('#paymentFrm').show();
        $('#agreeForm').hide();
      });

      $('#finish').click(function () {
        $('#paymentFrm').hide();
        $('#regForm').show();
        // redirect to profile page......
      });

    });
  }

  public initPay(paymentForm): void {
    // console.log(paymentForm);
    const regJSON = JSON.parse(this.jsonObject);
    // console.log(regJSON.firstname + ' : ' + regJSON.email + ' : ' + regJSON.mobile);

    const options = {
      'key': 'rzp_test_kvBAU6Bq3UYBA4', // 'rzp_live_KDIXJbcpQwgFxn',
      'amount': paymentForm.membership, // '100', // 2000 paise = INR 20
      'name': 'Kongumanamedai.com',
      'description': paymentForm.description,
      'image': '/your_logo.png',
      'handler': function (response) {
        console.log(response.razorpay_payment_id);
        console.log(response);
        paymentForm.chequeNumber = response.razorpay_payment_id;
        console.log('Payment Form chequeNumber :: ' + paymentForm.chequeNumber);
        $('#payBtn').hide();
        $('#finishBtn').show();
      },
      'prefill': {
        'name': regJSON.firstname,
        'email': regJSON.email,
        'contact': regJSON.mobile
      },
      'notes': {
        'address': 'Hello World'
      },
      'theme': {
        'color': '#F37254'
      }
    };

    this.rzp1 = new this.winRef.nativeWindow.Razorpay(options);
    this.rzp1.open();
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  // convenience getter for easy access to form fields
  get p() {
    return this.paymentForm.controls;
  }

  onRegister(formValue) {
    this.submitted = true;
    // console.log(this.registerForm.value);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    $('#agreeForm').show();
    $('#next').hide();
    $('#regForm').hide();
    this.close();
    this.jsonObject = JSON.stringify(formValue);
    console.log(this.jsonObject);
  }

  paymentSubmit(paymentFormValue) {
    const paymentJSON = JSON.stringify(paymentFormValue);
    console.log('paymentJSON :: ' + paymentJSON);

    const regJSON = [];
    regJSON.push(JSON.parse(this.jsonObject));
    regJSON.push(JSON.parse(paymentJSON));

    console.log(regJSON);
    console.log(JSON.stringify(regJSON));
    this._service.register(JSON.stringify(regJSON)).subscribe(
      data => {
        console.log('Registration successful');
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate(['/profile']);
        $('#regForm').hide();
        $('#agreeForm').hide();
        $('#paymentFrm').hide();
        $('#register-popup').hide();
      },
      error => {
        // this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  close() {
    this.registerForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: ''
    });
  }

  closeAgreePopup() {
    // console.log($('#closeBtn'));
    $('#agreeForm').hide();
    $('#regForm').show();
    this.agreeForm = this.formBuilder.group({
      agree: ''
    });
  }

  agreeCall(event) {
    console.log(event.target.checked);
    // console.log(this.jsonObject);
    $('#next').show();
  }

  onLine() {
    $('#offlineForm').hide();
    $('#onlineForm').show();
  }

  offLine() {
    $('#offlineForm').show();
    $('#onlineForm').hide();
  }

  emailCheck(e) {
    const emailId = e.target.value;
    this._service.emailCheckService(emailId).subscribe(
      data => {
        const check = data;
        if (check) {
          console.log('Email id already exisit!');
          this.emailUsed = e.target.value;
          e.target.value = '';
          e.target.focus();
        } else {
          this.emailUsed = '';
        }
      },
      error => {
        console.log('email chekc error : ', error);
      }
    );
  }

  mobileCheck(e) {
    const mobile = e.target.value;
    this._service.mobileCheckService(mobile).subscribe(
      data => {

        const check = data;
        if (check) {
          console.log('Mobile number already exisit!');
          this.mobileUsed = e.target.value;
          e.target.value = '';
          e.target.focus();
        } else {
          this.mobileUsed = '';
        }
      },
      error => {
        console.log('mobile check error : ', error);
      }
    );
  }

}
