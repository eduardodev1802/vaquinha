import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private http: HttpClient) { }

  getProjetoDetalhe(id: any) {
    return this.http.get<any>(`${environment.apiUrl}project/by-ids/${id}?from=0&pageSize=-1&lat=0&lon=0&`)
      .pipe(map(resp => {
        return resp;
      }));
  }

}
