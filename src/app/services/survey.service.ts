import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';
import { QuestionResponse } from '../../QuestionResponse';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "http://localhost:60805/api/Surveys";
  
  selectedSurvey: any;

  getAllSurveys(): Observable<QuestionResponse> {
    return this.httpClient.get<QuestionResponse>(this.apiUrl +'?PageIndex=0&PageSize=11');
  }

  addSurvey(survey: Survey): Observable<Survey> {
    return this.httpClient.post<Survey>(this.apiUrl, survey);
  }
}
