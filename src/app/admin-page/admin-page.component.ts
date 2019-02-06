import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';


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

  constructor(private db: DBService) {
    if (db.isAdmin) {
      this.db.getAllUsersFromDb().subscribe(
        (users) => {
          this.DBUsers.push(users);
          this.DBUsers = this.DBUsers[0];
          this.DBUsers.shift();
        }
      )
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
  changeVolunteerStatusWithId(statusData, userId) {
    this.db.changeUserStatus(statusData, userId);
  }
  saveEditedQuestion(newQuestion, id) {
    this.db.editQuestion(newQuestion, id);
  }

  toggleEditInput(index) {
    this.showChangeQuestionForm[index] = !this.showChangeQuestionForm[index];
  }
  toggleAddNewQuestionBtn() {
    this.addNewQuestionFormToggle = !this.addNewQuestionFormToggle;
  }
  deleteUser(userId) {
    this.db.deleteUser(userId);
  }
  editQuestion(id) {
    console.log(id);
  }
  saveNewQuestion(newQuestion) {
    this.db.saveNewQuestion(newQuestion);
  }
  deleteQuestion(id) {
    this.db.deleteQuestion(id);
  }


  ngOnInit() {
  }

}
