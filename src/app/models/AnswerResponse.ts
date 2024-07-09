import { Question } from "./question";

export interface AnswerResponse {
    items:Question[];
    count: number;
    index: number;
    size: number;
    pages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}