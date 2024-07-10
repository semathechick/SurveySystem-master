import { Answer } from "./answer";
import { Question } from "./question";

export interface UiSurveyQuestionResponse {
    answers:Answer[];
    questions: Question[];
}