import { Component, OnInit } from '@angular/core';
import { KonguService } from "../../../app/services/kongu.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private _service: KonguService,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  singUp(formValue: string) {
  }

  // onAboutButton(): void {
  //   this._router.navigate(["/about"]);
  // }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      mobile: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      flag: true,
      role: "admin"
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    this.submitted = true;
    // console.log(this.registerForm.value);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this._service.register(this.registerForm.value).subscribe(
      data => {
        console.log("Registration successful");
        //this.alertService.success("Registration successful", true);
        //this.router.navigate(["/login"]);
      },
      error => {
        // this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  close() {
    this.registerForm = this.formBuilder.group({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: ""
    });
  }
}
