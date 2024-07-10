import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Survey } from '../../../models/survey';
import { CommonModule } from '@angular/common';
import { Question } from '../../../models/question';
import { Answer } from '../../../models/answer';
import { UiSurveyQuestionResponse } from '../../../models/UiSurveyQuestionResponse';
import { SurveyService } from '../../../services/survey.service';
import { QuestionResponse } from '../../../models/QuestionResponse';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss'
})

export class SurveyComponent {

  constructor(private formBuilder: FormBuilder, private surveyService:SurveyService, private route: ActivatedRoute){} 
   surveyForm!: FormGroup;
   selectedSurvey: Survey = {id:'', surveyTitle: ''};
   questions: Question[]=[];
   answers: Answer[]=[];
   surveys:Survey[]=[];
   allResponses: any[] = [];

   ngOnInit(): void {
    const selectedQuestion:Question={id:'', indvQuestion:'', surveyId:''};
    this.createSurveyForm();
    this.loadSurveys();
    this.getAnswersForQuestion(selectedQuestion);
    this.route.params.subscribe(params => {
      const surveyId = params['id'];
     
    });
  }

  createSurveyForm(): void {
    this.surveyForm = this.formBuilder.group({
      surveyTitle: ['', Validators.required], 
      
    });
  }
   
  loadSurveys(): void {
    this.surveyService.getAllSurveys().subscribe({
      next: (response :QuestionResponse) => {
        console.log('API response:', response);
        this.surveys = response.items;
      },
      error: (error) => {
        console.error('Error loading surveys:', error);
      }
    });
  }
  
  
  
  getAnswersForQuestion(question: Question): UiSurveyQuestionResponse {
        const relatedQuestions = this.questions.filter(q => q.surveyId === question.surveyId);
        const relatedAnswers = this.answers.filter(a => relatedQuestions.some(q => q.id === a.questionId));
        return {
          answers: relatedAnswers,
          questions: relatedQuestions
        };
      }

}
