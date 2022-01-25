import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalMsgComponent } from 'src/app/features/login/components/modal-msg/modal-msg.component';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private authAngular: AngularFireAuth, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<any>(null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        this.authAngular.auth.signInWithEmailAndPassword(username, password)
            .then((user: any) => {
                this.router.navigate(['/home']);
            })
            .catch(function (error) {
                window.alert(error.message)
             });
    }


    GoogleAuth() {
        return this.loginGoogle(new auth.GoogleAuthProvider());
    }

    FacebookAuth() {
        return this.loginGoogle(new auth.FacebookAuthProvider());
    }

    loginGoogle(provider: any) {
        return this.authAngular.auth.signInWithPopup(provider)
            .then((result) => {
            }).catch((error) => {
                console.log(error)
            })
    }

    loginFacebook(provider: any) {
        return this.authAngular.auth.signInWithPopup(provider)
            .then((result) => {
            }).catch((error) => {
                console.log(error)
            })
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
        })
      };

    cadastrarUsuario(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}create-user`, payload, {
          headers: this.httpOptions.headers
        })
          .pipe(map(resp => {
            return resp;
          }));
      }
}