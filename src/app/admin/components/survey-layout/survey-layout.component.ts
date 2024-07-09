import { Component } from '@angular/core';
import { AdminSurveyComponent } from '../admin-survey/admin-survey.component';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { RouterModule } from '@angular/router';
import { AddAnswerComponent } from '../add-answer/add-answer.component';

@Component({
  selector: 'app-survey-layout',
  standalone: true,
  imports: [AdminSurveyComponent,AddQuestionComponent,AddAnswerComponent, RouterModule],
  templateUrl: './survey-layout.component.html',
  styleUrl: './survey-layout.component.scss'
})
export class SurveyLayoutComponent {

}
