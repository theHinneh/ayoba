import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  public getAllTodos(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  public singleTodo(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}edit/${id}`);
  }

  public createTodo(todo: any): Observable<any> {
    return this.http.post(this.baseUrl, todo);
  }

  public editTodo(id: number, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}edit/${id}`, data);
  }

  public deleteTodo(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}remove/${id}`);
  }
}
