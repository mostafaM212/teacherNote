import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { StudentAttendance } from '../models/StudentAttendance';

@Injectable({
  providedIn: 'root',
})
export class StudentAttendanceService {
  attendance$ = new BehaviorSubject<StudentAttendance[]>([]);
  baseUrl: string = environment.backendUrl + 'studentAttendances';

  constructor(private http: HttpClient) {}

  addStudentAttendance(data: any) {
    return this.http.post<{
      message: string;
      StudentAttendance: StudentAttendance;
    }>(this.baseUrl, data);
  }
  addStudentAttendanceForAllStudents(data: any) {
    return this.http.post<{
      message: string;
      StudentAttendances: StudentAttendance[];
    }>(this.baseUrl + '/group', data);
  }
  getStudentAttendances() {
    return this.http.get<{
      message: string;
      StudentAttendances: StudentAttendance[];
    }>(this.baseUrl);
  }
  getStudentAttendancesByGroup(id: string) {
    return this.http.get<{
      message: string;
      StudentAttendances: StudentAttendance[];
    }>(this.baseUrl + '/group/' + id);
  }
  getStudentAttendancesByStudent(id: string) {
    return this.http.get<{
      message: string;
      StudentAttendances: StudentAttendance[];
    }>(this.baseUrl + '/student/' + id);
  }
  updateStudentAttendance(id: string, data: any) {
    return this.http.put<{
      message: string;
      StudentAttendance: StudentAttendance;
    }>(this.baseUrl + '/' + id, data);
  }
  getStudentAttendance(id: string) {
    return this.http.get<{
      message: string;
      StudentAttendance: StudentAttendance;
    }>(this.baseUrl + '/' + id);
  }
  deleteStudentAttendance(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
