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


  getProjects(pageNumber: number, query: string, sort: string) {
    let url;

    if (sort === null && query === null) {
      url = `project/search?lat=15.7965037&lon=47.8859936&start=${pageNumber}&pageSize=6&`
    }  
    
    if (sort && query === null) {
      url = `project/search?lat=15.7965037&lon=47.8859936&start=${pageNumber}&pageSize=6&sort=${sort}`
    } 
    
    if(query && sort === null) {
      url = `project/search?lat=15.7965037&lon=47.8859936&start=${pageNumber}&pageSize=6&qry=${query}`
    }

    return this.http.get<any>(`${environment.apiUrl}${url}`, {
      headers: this.httpOptions.headers
    })
      .pipe(map(resp => {
        return resp;
      }));
  }
}
