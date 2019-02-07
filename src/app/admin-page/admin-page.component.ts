import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { RegisterLoginService } from '../services/register-login.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  DBUsers = [];
  Questions = [];
  showChangeQuestionForm = [];
  addNewQuestionFormToggle = false;

  constructor(private db: DBService, private auth: RegisterLoginService) {
    auth.IsAuth = localStorage.loggedUser ? true : false;
    if (db.isAdmin) {
      if (this.DBUsers.length == 0) {
        this.db.getAllUsersFromDb().subscribe(
          (users) => {
            this.DBUsers.push(users);
            this.DBUsers = this.DBUsers[0];
            this.DBUsers.shift();
          }
        )
      }
      if (this.Questions.length == 0) {
        this.db.getAllQuestionsFromDB().subscribe(
          (questions) => {
            questions.shift();
            this.Questions.push(...questions);
            for (let i = 0; i < questions.lenght; i++) {
              this.showChangeQuestionForm[i] = false;
            }
          }
        )
      }
    }
  }

  changeVolunteerStatusWithId(statusData, userId, vectorIndex) {
    this.db.changeUserStatus(statusData, userId);
    this.DBUsers[vectorIndex].userStatus = statusData.newStatus;
  }

  saveEditedQuestion(newQuestion, id, index) {
    if (this.db.checkTextlength(newQuestion.content)) {
      this.db.editQuestion(newQuestion, id);
      this.Questions[index].content = newQuestion.content;
      this.toggleEditInput(index);
    }
  }

  toggleEditInput(index) {
    this.showChangeQuestionForm[index] = !this.showChangeQuestionForm[index];
  }

  toggleAddNewQuestionBtn() {
    this.addNewQuestionFormToggle = !this.addNewQuestionFormToggle;
  }

  deleteUser(userId, index, userName) {
    if (confirm("Are you sure you want to delete " + userName + " ?")) {
      this.db.deleteUser(userId);
      this.DBUsers.splice(index, 1);
    }
  }

  saveNewQuestion(newQuestion) {
    if (this.db.checkTextlength(newQuestion.content)) {
      this.db.saveNewQuestion(newQuestion);
      this.Questions.push(newQuestion);
      this.addNewQuestionFormToggle = false;
    }
  }

  deleteQuestion(id, index) {
    this.db.deleteQuestion(id);
    this.Questions.splice(index, 1);
  }

  ngOnInit() {
  }

}
