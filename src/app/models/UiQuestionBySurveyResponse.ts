import { Question } from "./question";

export interface UiQuestionBySurveyResponse{
    items:Question[];
    answerId:string;
    count: number;
    index: number;
    size: number;
    pages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}