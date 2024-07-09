import { Survey } from "./app/models/survey";

export interface QuestionResponse {
    items:Survey[];
    count: number;
    index: number;
    size: number;
    pages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}