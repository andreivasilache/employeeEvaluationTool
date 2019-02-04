import { Component, OnInit } from '@angular/core';
import { RegisterLoginService } from '../services/register-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: RegisterLoginService) { }

  onSubmit(registerData: any) {
    this.auth.register(registerData);
  }


  ngOnInit() {
  }

}
