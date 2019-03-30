import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  currentUser: User;
  @Input() activeMenu: string;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }
}
