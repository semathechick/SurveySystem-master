import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Observable } from 'rxjs';

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

  getQuestionsBySurveyId(surveyId: string): Observable<Question[]> {
    const url = `${this.apiUrl}/GetBySurveyId/${surveyId}`;
    return this.httpClient.get<Question[]>(url);
  }
}


