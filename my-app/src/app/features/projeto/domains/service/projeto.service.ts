import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProjetoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) { }

  getProjetoDetalhe(id: any) {
    return this.http.get<any>(`${environment.apiUrl}project/by-ids/${id}?from=0&pageSize=-1&lat=0&lon=0`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }

  getComentarios(id: any) {
    return this.http.get<any>(`${environment.apiUrl}comments/P/${id}`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }

  getRespostaComentarios(id: any) {
    return this.http.get<any>(`${environment.apiUrl}comments/C/${id}`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }

  getContribuicoes(id: any) {
    return this.http.get<any>(`${environment.apiUrl}donations/${id}`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }

  getUser(id: any) {
    return this.http.get<any>(`${environment.apiUrl}users/${id}`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }

  getTimeLine(id: any) {
    return this.http.get<any>(`${environment.apiUrl}project/from-user/${id}?from=0&pageSize=10&lat=-15.83&lon=-47.86`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }

}


