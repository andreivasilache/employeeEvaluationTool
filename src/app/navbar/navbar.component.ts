import { Component, OnInit } from '@angular/core';
import { RegisterLoginService } from '../services/register-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: RegisterLoginService) {
  }

  ngOnInit() {
  }
  logOut() {
    this.auth.loggedUser = null;
    this.auth.IsAuth = false;
    localStorage.clear();
  }

}
