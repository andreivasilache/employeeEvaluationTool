import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  getUserUrl = 'http://localhost:3000/users?username=';
  createUserUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  saveLoggedUserOnLocalStorage(username, nameOfUser, employeeStatus) {
    const user = {
      username: username,
      name: nameOfUser,
      employeeStatus: employeeStatus
    }
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getLoggedUserOnLocalStorage() {
    const localStorageData = localStorage.getItem('loggedUser');
    if (localStorage) {
      return JSON.parse(localStorageData);
    }
  }

  checkIfUserExists(username): Observable<any> {
    return this.http.get(this.getUserUrl + username);
  }

  login(data) {
    this.checkIfUserExists(data.username).subscribe(
      (dbUser) => {
        if (dbUser.length === 1) {
          console.log(dbUser);
          this.saveLoggedUserOnLocalStorage(dbUser[0].username, dbUser[0].name, dbUser[0].status);
        } else {
          alert("You need to register first!");
        }
      }
    )
  }

  register(data) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    this.checkIfUserExists(data.username).subscribe(
      (dbUser) => {
        if (dbUser.length === 1) {
          console.log("This user is already registered, please log in!");
        } else {
          this.http.post(this.createUserUrl, data, options)
            .subscribe(
              (registeredUser) => {
                this.saveLoggedUserOnLocalStorage(registeredUser.username, registeredUser.name, registeredUser.status);
              }
            );
        }
      }
    )
  }

}
