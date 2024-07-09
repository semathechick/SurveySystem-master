import { Pipe, PipeTransform } from '@angular/core';
import { Question } from './models/question';

@Pipe({
  name: 'questionPipe',
  standalone: true
})
export class QuestionPipePipe implements PipeTransform {

  transform(value: Question[], searchKey:string): Question[] {
    if (!value || !searchKey || searchKey.length < 2) return value;
    return value.filter((v) => v.indvQuestion.toLowerCase().includes(searchKey.toLowerCase()));
  }

}
