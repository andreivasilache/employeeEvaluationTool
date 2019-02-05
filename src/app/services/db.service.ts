import { Injectable } from '@angular/core';
import { RegisterLoginService } from './register-login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DBService {
  isAdmin: boolean;
  userUrl = "http://localhost:3000/users";

  constructor(private auth: RegisterLoginService, private http: HttpClient) {
    this.isAdmin = auth.isAdmin;
  }

  getAllUsersFromDb(): Observable<any> {
    return this.http.get(this.userUrl);
  }
}
