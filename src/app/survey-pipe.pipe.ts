import { Pipe, type PipeTransform } from '@angular/core';
import { Survey } from './models/survey';



@Pipe({
  name: 'FilterSurveyPipe',
  standalone: true,
})
export class FilterSurveyPipe implements PipeTransform {

  transform(value: Survey[], searchKey:string): Survey[] {
    if (!value || !searchKey || searchKey.length < 2) return value;
    return value.filter((v) => v.surveyTitle.toLowerCase().includes(searchKey.toLowerCase()));

}}
