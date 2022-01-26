import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';


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


  constructor(private http: HttpClient, private authAngular: AngularFireAuth,) { }

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

  getTimeLine(id: any, pageSize: number) {
    return this.http.get<any>(`${environment.apiUrl}project/from-user/${id}?from=0&pageSize=${pageSize}&lat=-15.83&lon=-47.86`)
      .pipe(map(resp => {
        return resp;
      }));
  }


  getPrestacaoContas(id: any) {
    return this.http.get<any>(`${environment.apiUrl}done-reports/P/${id}`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }

  getTodosProjetos(id: any, pageSize: number) {
    return this.http.get<any>(`${environment.apiUrl}project/from-user/${id}?from=0&pageSize=${pageSize}&lat=-15.83&lon=-47.86&`)
      .pipe(map(resp => {
        return resp;
      }));
  }

  getCategorias() {
    return this.http.get<any>(`${environment.apiUrl}project/subjects`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }

  getAvaliacoes(idProjeto: any) {
    return this.http.get<any>(`${environment.apiUrl}project/ratings/${idProjeto}`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }
  
  avaliar(idProjeto: any, valor: any, token: string) {
    return this.http.post<any>(`${environment.apiUrl}sec/project/rate/${idProjeto}/${valor}`, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      })
    })
      .pipe(map(resp => {
        return resp;
      }));
  }

}


