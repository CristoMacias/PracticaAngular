import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://jsonplaceholder.typicode.com/users";

  private http = inject(HttpClient);

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl)
  }

  getUserId(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
