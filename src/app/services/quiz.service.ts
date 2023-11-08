import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/Quiz';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  quizzes$ = new BehaviorSubject<Quiz[]>([]);
  baseUrl: string = environment.backendUrl + 'quiz';

  constructor(private http: HttpClient) {}

  addQuiz(data: any) {
    return this.http.post<{
      message: string;
      Quiz: Quiz;
    }>(this.baseUrl, data);
  }
  addQuizForAllStudents(data: any) {
    return this.http.post<{
      message: string;
      Quizs: Quiz[];
    }>(this.baseUrl + '/students', { quizzes: data });
  }
  getQuizs() {
    return this.http.get<{
      message: string;
      Quizs: Quiz[];
    }>(this.baseUrl);
  }
  getQuizsByGroup(id: string) {
    return this.http.get<{
      message: string;
      Quizs: Quiz[];
    }>(this.baseUrl + '/group/' + id);
  }
  getQuizsByStudent(id: string) {
    return this.http.get<{
      message: string;
      Quizs: Quiz[];
    }>(this.baseUrl + '/student/' + id);
  }
  updateQuiz(id: string, data: any) {
    return this.http.put<{
      message: string;
      Quiz: Quiz;
    }>(this.baseUrl + '/' + id, data);
  }
  getQuiz(id: string) {
    return this.http.get<{
      message: string;
      Quiz: Quiz;
    }>(this.baseUrl + '/' + id);
  }
  deleteQuiz(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
