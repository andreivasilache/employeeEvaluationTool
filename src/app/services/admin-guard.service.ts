import { Injectable } from '@angular/core';
import { RegisterLoginService } from './register-login.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private auth: RegisterLoginService) { }

  canActivate(): boolean {
    if (!this.auth.isAdmin) {
      return false;
    }
    return true;
  }
}
