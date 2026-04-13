import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDB } from '../models/userdb';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class DbService {

private apiUrl = "http://localhost:3000/users";

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<UserDB[]>(this.apiUrl);
  }

  addUser(user: UserDB){
    return this.http.post<UserDB>(this.apiUrl, user);
  }

  deleteUser(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

private apiAdminUrl = "http://localhost:3000/admin";

  getAdmin(){
    return this.http.get<UserDB[]>(this.apiAdminUrl);
  }

private apiProductosUrl = "http://localhost:3000/productos";
  getProductos(){
    return this.http.get<Producto[]>(this.apiProductosUrl);
  }
}
