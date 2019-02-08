import { Component, OnInit } from '@angular/core';
import { RegisterLoginService } from '../services/register-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMesage: string;


  onSubmit(loginData) {
    this.auth.login(loginData);
  }

  constructor(private auth: RegisterLoginService) {
    this.auth.loginErrMsg.subscribe(
      (errMsg) => {
        this.errorMesage = errMsg

        setTimeout(() => {
          this.errorMesage = undefined;
        }, 6000)
      }
    )
  }


  ngOnInit() {

  }

}
