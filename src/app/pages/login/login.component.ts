import { Component, OnInit } from '@angular/core';
import { KonguService } from "../../../app/services/kongu.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private _service: KonguService,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    console.log(this.loginForm.value);
    // this.submitted = true;
    // // console.log(this.registerForm.value);
    // // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //   return;
    // }

    // this.loading = true;
    // this._service.register(this.registerForm.value).subscribe(
    //   data => {
    //     console.log("Registration successful");
    //     //this.alertService.success("Registration successful", true);
    //     //this.router.navigate(["/login"]);
    //   },
    //   error => {
    //     // this.alertService.error(error);
    //     this.loading = false;
    //   }
    // );
  }

  close() {
    this.loginForm = this.formBuilder.group({
      userid: "",
      password: ""
    });
  }

}
