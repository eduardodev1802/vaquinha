import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';


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
            .catch(function (error) { });
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
                console.log('You have been successfully logged in!')
            }).catch((error) => {
                console.log(error)
            })
    }

    loginFacebook(provider: any) {
        return this.authAngular.auth.signInWithPopup(provider)
            .then((result) => {
                console.log('You have been successfully logged in!')
            }).catch((error) => {
                console.log(error)
            })
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}