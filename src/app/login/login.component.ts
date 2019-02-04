import { Component, OnInit } from '@angular/core';
import { RegisterLoginService } from '../services/register-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  onSubmit(loginData) {
    this.auth.login(loginData);
  }

  constructor(private auth: RegisterLoginService) { }

  ngOnInit() {

  }

}
