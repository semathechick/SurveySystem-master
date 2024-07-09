import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { Observable } from 'rxjs';
import { AnswerResponse } from '../models/AnswerResponse';

@Injectable({
  providedIn: 'root'
})
export class AnswerService{

  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "http://localhost:60805/api/Answers";

  addAnswer(answer:Answer):Observable<Answer>{
    const token = localStorage.getItem('Token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this
    .httpClient.post<Answer>(this.apiUrl,answer,{headers})
  }

  getAllAnswers(): Observable<AnswerResponse> {
    return this.httpClient.get<AnswerResponse>(this.apiUrl +'?PageIndex=0&PageSize=11');
  }
  getAnswersByQuestionId(questionId: string): Observable<Answer[]> {
    const url = `${this.apiUrl}/GetByQuestionId/${questionId}`;
    return this.httpClient.get<Answer[]>(url);
  }
}
