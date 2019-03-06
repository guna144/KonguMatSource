import { Component, OnInit } from '@angular/core';
import { KonguService } from '../../../app/_services/kongu.service';
import { User } from '../../_models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _service: KonguService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      profileId: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      noOfChildren: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bodyType: ['', Validators.required]
    });
  }

  profileUpdate(formValue: any) {
    console.log(JSON.stringify(formValue));

    this._service.profileUpdate(JSON.stringify(formValue)).subscribe(
      data => {
        console.log('Profile updated successful');
      },
      error => {
        console.log('profile update error : ', error);
      });
  }

}
