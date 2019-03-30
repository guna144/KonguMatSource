import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {

    $(document).ready(function () {

      $('.account').click(function () {
        var X = $(this).attr('id');
        if (X == 1) {
          $('.submenu').hide();
          $(this).attr('id', '0');
        }
        else {
          $('.submenu').show();
          $(this).attr('id', '1');
        }

      });

      // Mouse click on sub menu
      $('.submenu').mouseup(function () {
        return false
      });

      // Mouse click on my account link
      $('.account').mouseup(function () {
        return false
      });


      // Document Click
      $(document).mouseup(function () {
        $('.submenu').hide();
        $('.account').attr('id', '');
      });
    });

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
