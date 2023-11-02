import { HttpClient } from '@angular/common/http';
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
  getStudents() {
    return this.http.get<{ message: string; students: Student[] }>(
      this.baseUrl
    );
  }
  getStudentsByGroup(id: string) {
    return this.http.get<{ message: string; students: Student[] }>(
      this.baseUrl + '/group/' + id
    );
  }
  updateStudent(data: any) {
    return this.http.put(this.baseUrl, data);
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
