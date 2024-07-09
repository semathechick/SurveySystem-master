import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from '../../../models/question';
import { QuestionService } from '../../../services/question.service';
import { AnswerService } from '../../../services/answer.service';
import { Answer } from '../../../models/answer';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { QuestionPipePipe } from '../../../question-pipe.pipe';
import { AnswerResponse } from '../../../models/AnswerResponse';

@Component({
  selector: 'app-add-answer',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,AccordionModule,QuestionPipePipe,FormsModule],
  templateUrl: './add-answer.component.html',
  styleUrl: './add-answer.component.scss'
})
export class AddAnswerComponent {

  answerForm!: FormGroup;
  questions: Question[] = [];
  selectedQuestion: Question = { indvQuestion: '', surveyId: '' };
  searchKey : string = ' ';

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.createAnswerForm();
    this.loadQuestions();
  }
  selectQuestion(question: any): void {
    this.selectedQuestion = question; 
    this.answerForm.patchValue({
      questionId: question.id 
    });
    this.surveySelected.emit(); 
  }

  @Output() surveySelected = new EventEmitter<void>();

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe({
      next: (response: AnswerResponse) => {
        console.log('API response:', response);
  
        console.log('Response keys:', Object.keys(response));
  
        if (response.items && Array.isArray(response.items)) {
          this.questions = response.items;
          console.log('Surveys loaded:', this.questions);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error: (error) => {
        console.error('Error loading surveys:', error);
      }
    });
  }
  onQuestionSelected(event: any): void {}

  onQuestionSelect(event: Event): void {
    const selectedQuestionId = (event.target as HTMLSelectElement).value;
  
    if (selectedQuestionId) {
      this.selectedQuestion = this.questions.find(question => question.surveyId === selectedQuestionId) as Question;
      console.log('Selected survey:', this.selectedQuestion);
    } else {
      console.error('Invalid selected survey id:', selectedQuestionId);
    }
  }
  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Input value:', inputValue);
  }

createAnswerForm(): void {
  this.answerForm = this.formBuilder.group({
    id: ['', Validators.required], 
    userAnswer: ['', Validators.required],
    questionId:['', Validators.required],
    indvQuestion: ['',Validators.required],
  });
}
 addToDb(): void {
  if (this.answerForm.valid) {
    const formDataAnswer: Answer = this.answerForm.value;
    const questionId = formDataAnswer.questionId;
   
    this.answerService.addAnswer(formDataAnswer).subscribe({
      next: (answerResponse) => {
        console.log('response', answerResponse);
        alert(formDataAnswer.userAnswer.toUpperCase() + " başarıyla eklendi");
      },
      error: (answerError) => {
        console.error('Error adding survey:', answerError);
        alert('Anket eklenirken bir hata oluştu.');
      }
    });
  }
}
}
