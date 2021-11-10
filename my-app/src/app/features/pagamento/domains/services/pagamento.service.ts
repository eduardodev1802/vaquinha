import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {

  }

  fazerPagamento(payload: any, token: any) {
    return this.http.post<any>(`https://payment.diegosilva.com.br/payment`, payload, {
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
