import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Group } from '../models/Group';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students$ = new BehaviorSubject<Student[]>([]);
  baseUrl: string = environment.backendUrl + 'students';

  constructor(private http: HttpClient) {}

  addStudent(data: any) {
    return this.http.post(this.baseUrl, data);
  }
  getStudents(numOfDocs?: number, from?: number, search?: string) {
    let httpParams = new HttpParams();
    if (numOfDocs) httpParams = httpParams.append('numOfDocs', numOfDocs);
    if (from) httpParams = httpParams.append('from', from);
    if (from) httpParams = httpParams.append('from', from);
    if (search) httpParams = httpParams.append('search', search);

    // console.log('test', httpParams);

    return this.http.get<{
      message: string;
      students: Student[];
      totalDocs: number;
    }>(this.baseUrl, {
      params: httpParams,
    });
  }
  getStudentsByGroup(id: string) {
    return this.http.get<{ message: string; students: Student[] }>(
      this.baseUrl + '/group/' + id
    );
  }
  updateStudent(id: string, data: any) {
    return this.http.put<{ message: string; student: Student }>(
      this.baseUrl + '/' + id,
      data
    );
  }
  getStudent(id: string) {
    return this.http.get<{ message: string; student: Student }>(
      this.baseUrl + '/' + id
    );
  }
  deleteStudent(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
