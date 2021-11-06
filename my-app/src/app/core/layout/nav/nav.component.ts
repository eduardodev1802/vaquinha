import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  showNav = false;
  logoUrl: any = null;

  constructor(
    private readonly router: Router,
    private authAngular: AngularFireAuth,
  ) {}

  ngOnInit(): void {
    this.authAngular.authState.subscribe((res: any) => {
      if (res && res.uid) {
        this.logoUrl = res.photoURL;
        
        return true;
      } else {
      
        return false;
      }
    });
  }

  logOut(): void {
    this.router.navigate(['/login']);
  }
}
