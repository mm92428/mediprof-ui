import { PaymentDto } from './../../data/Dto/payment.dto';
import { environment } from './../../../environment/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  initializePayment(model: PaymentDto): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/initialize`, model);
  }

  verifyPayment(reference: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/verify/${reference}`);
  }
}
