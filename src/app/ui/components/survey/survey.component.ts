import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Survey } from '../../../models/survey';
import { CommonModule } from '@angular/common';
import { Question } from '../../../models/question';
import { Answer } from '../../../models/answer';
import { SurveyService } from '../../../services/survey.service';
import { catchError, of} from 'rxjs';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {

  constructor(
    private formBuilder: FormBuilder,
    private surveyService: SurveyService,
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {}

  surveyForm!: FormGroup;
  surveyId: string | null = null;
  survey: Survey | undefined;
  question: Question |undefined ;
  answers: Answer[] = [];
  surveys: Survey[] = [];
  questions: Question[] = [];
  selectedSurvey: Survey | undefined;
  selectedSurveyId: string | null = null;

   

 ngOnInit(): void {
  const selectedQuestion:Question={indvQuestion:'',surveyId:''};
  this.createSurveyForm();
  this.surveyId = this.route.snapshot.params['id'];
    if (this.surveyId) {
      this.loadSurveyById(this.surveyId);
    } else {
      console.error('Invalid surveyId:', this.surveyId);
    }
}
  

  createSurveyForm(): void {
    this.surveyForm = this.formBuilder.group({
      surveyTitle: ['', Validators.required],
      surveyId: ['', Validators.required],
      indvQuestion: ['', Validators.required],
    });
  }

  
  loadSurveyById(surveyId: string): void {
    this.surveyService.getSurveyById(surveyId)
      .subscribe({
        next: (survey: Survey) => {
          this.survey = survey;
          this.loadQuestionsBySurveyId(surveyId);
          
        },
        error: (error) => {
          console.error('Error fetching survey:', error);
        }
      });
  }


  loadQuestionsBySurveyId(surveyId: string): void {
    this.questionService.getQuestionsBySurveyId(surveyId)
      .pipe(
        catchError(error => {
          console.error('Error fetching questions for survey ID:', surveyId, error);
          return of([]); 
        })
      )
      .subscribe((questions: Question[]) => {
        this.questions = questions; 
        console.log('Questions loaded successfully:', questions);
  
      });
  }
  
  
}
