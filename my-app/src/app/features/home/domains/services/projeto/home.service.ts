import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }


  getProjects(pageNumber: number, query: string, sort: string, categoria: string, latidude: any, longitude: any, uf: any) {
    let url;

    if (sort === null && query === null && categoria === null && uf === null) {
      url = `project/search?lat=${latidude}&lon=${longitude}&start=${pageNumber}&pageSize=6&`
    }  
    
    if (sort && query === null && categoria === null && uf === null) {
      url = `project/search?lat=${latidude}&lon=${longitude}&start=${pageNumber}&pageSize=6&sort=${sort}`
    } 
    
    if(query && sort === null && categoria === null && uf === null) {
      url = `project/search?lat=${latidude}&lon=${longitude}&start=${pageNumber}&pageSize=6&qry=${query}`
    }

    if(categoria !== null && query === null && sort === null && uf === null) {
      url = `project/search?lat=${latidude}&lon=${longitude}&start=${pageNumber}&pageSize=6&subjectsIds=${categoria}`
    }

    if(uf !== null && query === null && sort === null && categoria === null) {
      url = `project/search?lat=${latidude}&lon=${longitude}&start=${pageNumber}&pageSize=6&uf=${uf.uf}`
    }

    return this.http.get<any>(`${environment.apiUrl}${url}`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }

  getEstados() {
    return this.http.get<any>(`${environment.apiUrl}address/states`, {
      headers: this.httpOptions.headers
    })
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

}
