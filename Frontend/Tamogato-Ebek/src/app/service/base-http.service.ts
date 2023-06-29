import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService<T extends { _id: string }> {
  BASE_URL = environment.apiUrl;

  constructor(public http: HttpClient, entityName: String) {
    this.BASE_URL += entityName;
  }

  create(entity: T): Observable<T> {
    const entityObj = { ...entity, _id: null };
    return this.http.post<T>(`${this.BASE_URL}`, entityObj);
  }

  get(_id: number): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}/${_id}`);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.BASE_URL}`);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(`${this.BASE_URL}/${entity._id}`, entity);
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(`${this.BASE_URL}/${entity._id}`);
  }
}
