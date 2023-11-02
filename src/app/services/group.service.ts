import { HttpClient } from '@angular/common/http';
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
  getGroups() {
    return this.http.get<{ message: string; groups: Group[] }>(this.baseUrl);
  }
  updateGroup(data: any) {
    return this.http.put(this.baseUrl, data);
  }
  getGroup(id: string) {
    return this.http.get<{ message: string; group: Group }>(
      this.baseUrl + '/' + id
    );
  }
  deleteGroup(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
