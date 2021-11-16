import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalLojaComponent } from 'src/app/shared/components/modal-loja/modal-loja.component';
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
    private dialog: MatDialog
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

  abrirModalAppLoja() {
    this.dialog.open(ModalLojaComponent);
  }
}
