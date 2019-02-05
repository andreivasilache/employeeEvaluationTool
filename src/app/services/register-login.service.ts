import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface localStorageUser {
  username: string,
  name: string,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  getUserUrl = 'http://localhost:3000/users?username=';
  createUserUrl = 'http://localhost:3000/users';

  loggedUser: localStorageUser;


  IsAuth: boolean = localStorage ? true : false;


  constructor(private http: HttpClient) {
    const localStorageData: localStorageUser = this.getLoggedUserOnLocalStorage()
    this.loggedUser = {
      username: localStorageData.username,
      name: localStorageData.name,
      status: localStorageData.status,
    }
  }

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
          const verifyCreditials: boolean = data.username === dbUser[0].username && data.password === dbUser[0].password;
          if (verifyCreditials) {
            this.saveLoggedUserOnLocalStorage(dbUser[0].username, dbUser[0].name, dbUser[0].status);
            location.reload();
          } else {
            alert("The username password combination is wrong!")
          }
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
          alert("This user is already registered, please log in!");
        } else {
          return this.http.post(this.createUserUrl, data, options)
            .subscribe(
              (registeredUser: localStorageUser) => {
                this.saveLoggedUserOnLocalStorage(registeredUser.username, registeredUser.name, registeredUser.status);
                location.reload();
              }
            );
        }
      }
    )
  }

}
