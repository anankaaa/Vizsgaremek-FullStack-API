import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttpService<User> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
}
