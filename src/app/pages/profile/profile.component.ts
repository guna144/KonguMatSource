import { Component, OnInit } from '@angular/core';
import { KonguService } from '../../../app/_services/kongu.service';
import { User } from '../../_models/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';

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
  profileImages: any;
  message: string;
  selectedFiles: FileList;
  currentFileUpload: File;
  filePath: string;

  constructor(private formBuilder: FormBuilder, private _service: KonguService,
    private _http: HttpClient, private domSanitizer: DomSanitizer, private fb: FormBuilder) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('this.currentUser  : ' + JSON.stringify(this.currentUser));
    this.imageRetrieve();
  }

  ngOnInit() {

    $(document).ready(function () {
      $('#success-alert').hide();
    });
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
      imagePaths: '',
      lagnam: null,
      star: ['', Validators.required],
      dosham: [false, Validators.required],
      imageCount: 0
    });

    this.loadKootamData();
    //  this.loadStarsData();
    this.loadMoonSignData();
    this.profileForm.patchValue(this.currentUser);
  }

  fetchFilePath(event) {
    console.log('input.val() : ' + this.currentUser.profileId + ' == ' + event.target.value);
    this.selectedFiles = event.target.files;
    this.filePath = event.target.value;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this._service.fileUpload(this.currentFileUpload, this.currentUser.profileId).subscribe(event => {
      if (event instanceof HttpResponse) {
        this.message = 'Success! File is completely uploaded!';
        this.imageRetrieve();
      }
    });
  }

  imageRetrieve() {
    this._service.getImages(this.currentUser.profileId).subscribe(data => {
      this.profileImages = data;

      window.setTimeout(function () {
        $('.alert').fadeTo(500, 0).slideUp(500, function () {
          $(this).remove();
        });
      }, 2000);

    }, error => {
      console.log(error);
    });
  }


  loadKootamData() {
    this._http.get(this.dataURL + '/kootam.json').subscribe(data => {
      this.kootamArray = data;
    });
  }

  loadMoonSignData() {
    this._http.get(this.dataURL + '/moon-sign-stars.json').subscribe(data => {
      this.moonSignArray = data['moonsign'];
    });
  }

  loadStarsData(selectedValue: string) {
    console.log('selected VAlue : ' + selectedValue);
    this._http.get(this.dataURL + '/moon-sign-stars.json').subscribe(data => {
      this.starsArray = data[selectedValue];
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
}
