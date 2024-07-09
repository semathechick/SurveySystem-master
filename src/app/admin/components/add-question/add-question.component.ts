import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from '../../../models/question';
import { QuestionService } from '../../../services/question.service';
import { SurveyService } from '../../../services/survey.service';
import { Survey } from '../../../models/survey';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterSurveyPipe } from '../../../survey-pipe.pipe';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { QuestionResponse } from '../../../models/QuestionResponse';

@Component({
  selector: 'app-add-question',
  standalone:true,
  imports:[ReactiveFormsModule,FormsModule,MatFormFieldModule, MatSelectModule, MatInputModule,FilterSurveyPipe,CommonModule,AccordionModule],
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  surveys: any[] = []; 
  selectedSurvey: Survey = { id: '', surveyTitle: '' };
  searchKey : string = ' ';

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.createQuestionForm();
    this.loadSurveys();

  }
  

  createQuestionForm(): void {
    this.questionForm = this.formBuilder.group({
      surveyId: ['', Validators.required], 
      indvQuestion: ['', Validators.required]
    });
  }
  
  loadSurveys(): void {
  this.surveyService.getAllSurveys().subscribe({
    next: (response: QuestionResponse) => {
      console.log('API response:', response);

      // Inspect the response structure
      console.log('Response keys:', Object.keys(response));

      // Check if response.surveys is an array
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

  createQuestion(): void {
    if (this.questionForm.valid) {
      const newQuestion: Question = this.questionForm.value;
      const surveyId = newQuestion.surveyId;
      this.questionService.addQuestion(surveyId, newQuestion).subscribe({
        next: (response) => {
          console.log('Question added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding question:', error);
        }
      });
    }
  }

  selectSurvey(survey: any): void {
    this.selectedSurvey = survey; 
    this.questionForm.patchValue({
      surveyId: survey.id 
    });
    this.surveySelected.emit(); 
  }
  @Output() surveySelected = new EventEmitter<void>();

  onSurveySelected(event: any): void {
}

  onSurveySelect(event: Event): void {
    const selectedSurveyId = (event.target as HTMLSelectElement).value;
  
    if (selectedSurveyId) {
      this.selectedSurvey = this.surveys.find(survey => survey.id === selectedSurveyId);
      console.log('Selected survey:', this.selectedSurvey);
    } else {
      console.error('Invalid selected survey id:', selectedSurveyId);
    }
  }
  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Input value:', inputValue);
  }
  addToDb(): void {
    if (this.questionForm.valid) {
      const formDataQuestion: Question = this.questionForm.value;
      const surveyId = formDataQuestion.surveyId;
      console.log(formDataQuestion.indvQuestion);
  
      this.questionService.addQuestion(formDataQuestion.surveyId, formDataQuestion).subscribe({
        next: (questionResponse) => {
          console.log('response', questionResponse);
          alert(formDataQuestion.indvQuestion.toUpperCase() + " başarıyla eklendi");
        },
        error: (questionError) => {
          console.error('Error adding survey:', questionError);
          alert('Anket eklenirken bir hata oluştu.');
        }
      });
    }
  }
}

