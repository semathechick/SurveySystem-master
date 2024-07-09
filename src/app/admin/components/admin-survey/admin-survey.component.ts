import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Survey } from '../../../models/survey';
import { SurveyService } from '../../../services/survey.service';
import { RouterModule } from '@angular/router';
import { QuestionResponse } from '../../../models/QuestionResponse';

@Component({
  selector: 'app-admin-survey',
  standalone:true,
  imports:[ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './admin-survey.component.html',
  styleUrls: ['./admin-survey.component.scss']
})
export class AdminSurveyComponent implements OnInit {
  surveyForm!: FormGroup;
  questionForm!: FormGroup;
  answerForm!: FormGroup;
  surveys: Survey[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.createSurveyForm();
    this.createAnswerForm();
    this.loadSurveys();
  }

  createSurveyForm(): void {
    this.surveyForm = this.formBuilder.group({
      surveyTitle: ['', Validators.required]
    });
  }

 

  createAnswerForm(): void {
    this.answerForm = this.formBuilder.group({
      questionId: ['', Validators.required],
      userAnswer: ['', Validators.required]
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

  createSurvey(): void {
    if (this.surveyForm.valid) {
      const newSurvey: Survey = this.surveyForm.value;
      this.surveyService.addSurvey(newSurvey).subscribe({
        next: (response) => {
          console.log('Survey added successfully:', response);
          this.loadSurveys(); // Reload surveys after adding new one
        },
        error: (error) => {
          console.error('Error adding survey:', error);
        }
      });
    }
  }

  addToDb(): void {
    if (this.surveyForm.valid) {
      const formDataSurvey: Survey = this.surveyForm.value;
      console.log(formDataSurvey.surveyTitle);
  
      this.surveyService.addSurvey(formDataSurvey).subscribe({
        next: (surveyResponse) => {
          console.log('response', surveyResponse);
          alert(formDataSurvey.surveyTitle.toUpperCase() + " başarıyla eklendi");
          this.loadSurveys(); 
        },
        error: (surveyError) => {
          console.error('Error adding survey:', surveyError);
          alert('Anket eklenirken bir hata oluştu.');
        }
      });
    }
}
}
