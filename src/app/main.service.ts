import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

declare const getAyoba: any;
// declare const Ayoba: any;

// import * as Ayoba from 'getAyoba'

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  //Start Added by Obed
  public loadJsFile(url: string) {
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  //End

  private getUserAgent(): any {
    const Ayoba = getAyoba()
    console.warn('Ayoba', Ayoba);
    // return Ayoba.getMsisdn();
  }

  public getAllTodos(): Observable<any> {
    this.getUserAgent();

    return this.http.get(`${this.baseUrl}`);
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
