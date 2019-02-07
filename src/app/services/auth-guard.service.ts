import { Injectable } from '@angular/core';
import { RegisterLoginService } from './register-login.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: RegisterLoginService, private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.IsAuth) {
      this.router.navigate(['register']);
      return false;
    }
    return true;
  }
}
