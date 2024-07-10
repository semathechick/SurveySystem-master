import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Survey } from '../../../models/survey';
import { SurveyService } from '../../../services/survey.service';
import { QuestionResponse } from '../../../models/QuestionResponse';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent implements OnInit {
   surveyForm!: FormGroup;
   surveys: Survey[]=[];
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
    this.surveyService.getAllSurveys().subscribe({
      next: (response:QuestionResponse) => {
        console.log('API response:', response);
  
        console.log('Response keys:', Object.keys(response));
  
        if (response.items && Array.isArray(response.items)) {
          this.surveys = response.items;
          console.log('Surveys loaded:', this.surveys);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error: (error) => {
        console.error('Error loading surveys:', error);
      }
    });
  }
}
