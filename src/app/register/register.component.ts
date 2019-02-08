import { Component, OnInit } from '@angular/core';
import { RegisterLoginService } from '../services/register-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errMsg: string;

  constructor(private auth: RegisterLoginService) {
    this.auth.registerErrMsg.subscribe(
      (errMsg) => {
        this.errMsg = errMsg;
        setTimeout(() => {
          this.errMsg = undefined;
        }, 4000)
      }
    )
  }

  onSubmit(registerData: any) {
    this.auth.register(registerData);
  }

  ngOnInit() {
  }

}
