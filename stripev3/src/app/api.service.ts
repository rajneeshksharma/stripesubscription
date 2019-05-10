import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uri = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }


  addUser(user): Observable<any> {
    return this.http.post(`${this.uri}adduser`, user);
  }

}
