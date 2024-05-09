import { environment } from '../../../environment/environment';
import { ContactDto } from '../../data/Dto/contact.dto';
import { HttpResponse } from '../../data/Dto/http.response.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  contact(model: ContactDto): Observable<HttpResponse<ContactDto>> {
    const url: string = `${environment.apiUrl}/contact`;
    return this.http.post<HttpResponse<ContactDto>>(url, model);
  }

  getContacts(
    page: number = 1,
    IsFetchByMonth: boolean = false,
    limit: number = 20
  ): Observable<HttpResponse<ContactDto[]>> {
    const url: string = `${environment.apiUrl}/contact/get-all?page=${page}&IsFetchByMonth=${IsFetchByMonth}&limit=${limit}`;
    return this.http.get<HttpResponse<ContactDto[]>>(url);
  }

  deleteContact(msgId: string): Observable<HttpResponse<{ deleted: boolean }>> {
    const url: string = `${environment.apiUrl}/contact/delete/${msgId}`;
    return this.http.delete<HttpResponse<{ deleted: boolean }>>(url);
  }
}
