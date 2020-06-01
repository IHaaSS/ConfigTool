import { Injectable } from '@angular/core';
import { Question } from '../_classes/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public question: Question = new Question();

  constructor() { }

  getQuestion(): Question{
    return this.question;
  }
}
