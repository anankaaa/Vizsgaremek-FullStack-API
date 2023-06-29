import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from '../model/success';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class SuccessService extends BaseHttpService<Success> {
  constructor(http: HttpClient) {
    super(http, 'success');
  }
}
