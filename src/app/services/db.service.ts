import { Injectable } from '@angular/core';
import { RegisterLoginService } from './register-login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface User {
  adminStatus: string,
  id: string,
  name: string,
  password: string,
  userStatus: string,
  username: string,
}

export interface Question {
  id: string,
  content: string
}

@Injectable({
  providedIn: 'root'
})
export class DBService {
  isAdmin: boolean;
  userURL = "http://localhost:3000/users";
  changeUserStatusURL = "http://localhost:3000/users/";
  questionUrl = "http://localhost:3000/question";
  changeQuestionUrl = "http://localhost:3000/question/";

  constructor(private auth: RegisterLoginService, private http: HttpClient) {
    this.isAdmin = auth.isAdmin;
  }

  getAllUsersFromDb(): Observable<any> {
    return this.http.get(this.userURL);
  }

  getAllQuestionsFromDB(): Observable<any> {
    return this.http.get(this.questionUrl);
  }

  /*
    Put route can't be implemented on this npm ,so we will get data from DB ,modifiy it,
    delete initial user and resave it.
  */

  changeUserStatus(userStatus, id) {
    this.http.get(this.changeUserStatusURL + id).subscribe(
      (savedData: User) => {
        let user = {
          adminStatus: savedData.adminStatus,
          id: savedData.id,
          name: savedData.name,
          password: savedData.password,
          userStatus: userStatus.newStatus,
          username: savedData.username,
        }
        this.http.put(this.changeUserStatusURL + id, user).subscribe(
          (e) => location.reload()
        )
      }
    )
  }
  deleteUser(id) {
    this.http.delete(this.changeUserStatusURL + id).subscribe(
      (userDeleted) => location.reload()
    )
  }
  editQuestion(newQuestion, id) {
    this.http.put(this.changeQuestionUrl + id, newQuestion).subscribe(
      (savedQuestion) => location.reload()
    )
  }

  deleteQuestion(id) {
    this.http.delete(this.changeQuestionUrl + id).subscribe(
      (deletedQuestion) => location.reload()
    )
  }

  saveNewQuestion(questionContent) {
    this.http.post(this.questionUrl, questionContent).subscribe(
      (savedQuestion) => location.reload()
    )
  }
}
