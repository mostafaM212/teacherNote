import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Group } from '../models/Group';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groups$ = new BehaviorSubject<Group[]>([]);
  baseUrl: string = environment.backendUrl + 'groups';

  constructor(private http: HttpClient) {}

  addGroup(data: any) {
    return this.http.post(this.baseUrl, data);
  }
  getGroups(search?: string, day?: number) {
    let httpParams = new HttpParams();
    if (day) httpParams = httpParams.append('day', day);
    if (search?.length) httpParams = httpParams.append('search', search);

    return this.http.get<{ message: string; groups: Group[] }>(this.baseUrl, {
      params: httpParams,
    });
  }
  updateGroup(id: string, data: any) {
    return this.http.put(this.baseUrl + '/' + id, data);
  }
  getGroup(id: string) {
    return this.http.get<{ message: string; group: Group }>(
      this.baseUrl + '/' + id
    );
  }
  getGroupCount() {
    return this.http.get<{ message: string; count: number }>(
      this.baseUrl + '/count'
    );
  }
  deleteGroup(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
