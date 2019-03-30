import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  currentUser: User;
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

}
