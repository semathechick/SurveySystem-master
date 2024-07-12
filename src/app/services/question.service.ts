import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { map, Observable } from 'rxjs';
import { AnswerResponse } from '../models/AnswerResponse';
import { UiQuestionBySurveyResponse } from '../models/UiQuestionBySurveyResponse';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = "http://localhost:60805/api/Questions";
  constructor(private httpClient: HttpClient) { }

  addQuestion(surveyId: string, question: Question): Observable<Question> {
    const token = localStorage.getItem('Token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<Question>(this.apiUrl, question, { headers });
  }

  getSurveyByQuestionId(surveyId: string): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`http://localhost:60805/Survey/${surveyId}`);
  }

  selectedQuestion: any;
  getAllQuestions(): Observable<AnswerResponse> {
    return this.httpClient.get<AnswerResponse>(this.apiUrl +'?PageIndex=0&PageSize=11');
  }
  getQuestionsById(id: string): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${this.apiUrl}/${id}`);
  }

  getQuestionsBySurveyId(surveyId: string): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`http://localhost:60805/Questions/Survey${surveyId}`);
  }
}


