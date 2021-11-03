import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../core/services/auth/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authAngular: AngularFireAuth,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authAngular.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.router.navigate(['/']);
        return true;
      } else {
        this.router.navigate(['/login']);
        console.log('user is not logged in');
        return false;
      }
    });
  }
}