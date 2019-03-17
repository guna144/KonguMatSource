import { Component, OnInit } from '@angular/core';
import { KonguService } from '../../../app/_services/kongu.service';
import { User } from '../../_models/user';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import * as $ from 'jquery';

const URL = 'https://kmat.herokuapp.com/saveFile/5c8ce8270ccfe6adf3a4902a';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'app';

  currentUser: User;
  profileForm: FormGroup;
  enableFlag: Boolean = false;
  kootamArray: any;
  moonSignArray: any;
  starsArray: any;
  dataURL = '../../../assets/data/';
  public imagePath;

  constructor(private formBuilder: FormBuilder, private _service: KonguService, private _http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Current User : ' + JSON.stringify(this.currentUser));
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      profileId: '',
      mobile: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      relationShip: this.formBuilder.group({
        relationName: [''],
        relation: [''],
        relationMobile: ['']
      }),
      dob: null,
      godName: ['', Validators.required],
      godPlace: ['', Validators.required],
      timeOfBirth: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      sex: ['', Validators.required],
      address: this.formBuilder.group({
        doorNo: [''],
        street: [''],
        area: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      faceComplex: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bodyType: ['', Validators.required],
      foodHabits: ['', Validators.required],
      community: ['', Validators.required],
      kootam: ['', Validators.required],
      education: ['', Validators.required],
      occupation: ['', Validators.required],
      currentCity: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      noOfChildren: ['', Validators.required],
      familyType: ['', Validators.required],
      familyStatus: ['', Validators.required],
      familyValues: ['', Validators.required],
      physicalStatus: ['', Validators.required],
      annualIncome: ['', Validators.required],
      prefferedLocation: ['', Validators.required],
      prefferedOccupation: ['', Validators.required],
      noOfSiblings: ['', Validators.required],
      siblingsMaritalStatus: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      fatherContactNo: ['', Validators.required],
      moonSign: ['', Validators.required],
      lagnam: null,
      star: ['', Validators.required],
      dosham: [false, Validators.required],
      imageCount: 0
    });

    this.profileForm.patchValue(this.currentUser);
    this.loadKootamData();
    this.loadStarsData();
    this.loadMoonSignData();

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         
     };

  }


  impageUpload(e) {
    console.log('input.val() : ' + this.currentUser.profileId + ' == ' + e.target.value);
    this._service.imageSave(this.currentUser.profileId).subscribe(data => {
      console.log('This is upload : ' + data);
    });
  }

  loadKootamData() {
    this._http.get(this.dataURL + '/kootam.json').subscribe(data => {
      this.kootamArray = data;
    });
  }

  loadStarsData() {
    this._http.get(this.dataURL + '/stars.json').subscribe(data => {
      this.moonSignArray = data;
    });
  }

  loadMoonSignData() {
    this._http.get(this.dataURL + '/moon.sign.json').subscribe(data => {
      this.starsArray = data;
    });
  }
  profileUpdate(formValue: any) {

    formValue.firstname = this.currentUser.firstname;
    formValue.lastname = this.currentUser.lastname;
    formValue.mobile = this.currentUser.mobile;
    formValue.email = this.currentUser.email;
    formValue.sex = this.currentUser.sex;

    formValue.relationShip = [formValue.relationShip];
    formValue.address = [formValue.address];
    formValue.imagePaths = [formValue.imagePaths];
    formValue.profileId = this.currentUser.profileId;
    console.log(formValue);
    this._service.profileUpdate(formValue).subscribe(
      data => {
        console.log('Profile updated successful', data);
        this.profileForm.patchValue(data);
      },
      error => {
        console.log('profile update error : ', error);
      });
  }

  onChangeMaritalStatus(selectedValue) {
    console.log('Selected Value :  ' + selectedValue);
    if (selectedValue === 'never married') { this.enableFlag = true; }
    else { this.enableFlag = false; }
  }

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});

}
