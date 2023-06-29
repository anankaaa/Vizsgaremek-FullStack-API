import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aid } from '../model/aid';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class AidService extends BaseHttpService<Aid> {
  constructor(http: HttpClient) {
    super(http, 'aid');
  }

  override update(aid: Aid): Observable<Aid> {
    aid.collected += aid.payment;
    aid.payment = 0;

    if (aid.collected >= aid.amount) {
      aid.active = false;
    } else {
      aid.active = true;
    }

    return this.http.patch<Aid>(`${this.BASE_URL}/${aid._id}`, aid);
  }
}
