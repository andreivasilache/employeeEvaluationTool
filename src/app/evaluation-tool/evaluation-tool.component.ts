import { Component, OnInit } from '@angular/core';
import { RegisterLoginService } from '../services/register-login.service';
import { DBService } from '../services/db.service';

@Component({
  selector: 'app-evaluation-tool',
  templateUrl: './evaluation-tool.component.html',
  styleUrls: ['./evaluation-tool.component.css']
})
export class EvaluationToolComponent implements OnInit {
  questions = [];

  constructor(private auth: RegisterLoginService, public db: DBService) {
    auth.IsAuth = localStorage.loggedUser ? true : false;
    if (this.auth.IsAuth) {
      this.db.getAllQuestionsFromDB().subscribe(
        (questionsFromDb) => {
          this.questions.push(...questionsFromDb);
          this.questions.shift();
        }
      )
    }
  }

  ngOnInit() {
  }

}
