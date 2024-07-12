import { Answer } from "./answer";
import { Question } from "./question";
import { Survey } from "./survey";

export interface UiSurveyQuestionResponse {
    answers:Answer[];
    questions: Question[];
}