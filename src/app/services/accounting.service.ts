import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Total } from '../accounting/home-accounting/home-accounting.component';

@Injectable({
  providedIn: 'root',
})
export class AccountingService {
  baseUrl: string = environment.backendUrl + 'accounting';

  constructor(private http: HttpClient) {}

  getAllStudentMonthlySalary() {
    return this.http.get<{ data: Total }>(this.baseUrl + '/monthly');
  }
  getAllStudentEveryLessonSalary() {
    return this.http.get<{ data: Total }>(this.baseUrl + '/everyLesson');
  }
}
