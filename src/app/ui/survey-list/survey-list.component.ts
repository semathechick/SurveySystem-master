import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Survey } from '../../models/survey';
import { SurveyService } from '../../services/survey.service';
import { QuestionResponse } from '../../models/QuestionResponse';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent implements OnInit {
   surveyForm!: FormGroup;
   surveys!: Observable<Survey[]>;
   surveyId:string | null=null;
   constructor(private surveyService: SurveyService,private formBuilder:FormBuilder) {}
   

   ngOnInit(): void {
    this.loadSurveys();
    this.createSurveyForm();
  
  }
  createSurveyForm(): void {
    this.surveyForm = this.formBuilder.group({
      id: ['', Validators.required],
      surveyTitle:['', Validators.required]
    });
  }

  loadSurveys(): void {
    this.surveys = this.surveyService.getAllSurveys().pipe(
      map((response: QuestionResponse) => {
        console.log('API response:', response);
        console.log('Response keys:', Object.keys(response));

        if (response.items && Array.isArray(response.items)) {
          console.log('Surveys loaded:', response.items);
          return response.items;
        } else {
          console.error('Unexpected response format:', response);
          return [];
        }
      }),
      catchError(error => {
        console.error('Error loading surveys:', error);
        return of([]);
      })
    );
  }
  
}
