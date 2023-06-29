import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from '../model/dog';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class DogService extends BaseHttpService<Dog> {
  constructor(http: HttpClient) {
    super(http, 'dogs');
  }
}
