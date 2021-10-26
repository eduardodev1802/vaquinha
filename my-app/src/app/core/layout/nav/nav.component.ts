import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  showNav = false;
  logoUrl =
    'https://raw.githubusercontent.com/wizsolucoes/angular-white-label-schematic/master/docs/logowiz.png';

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    
  }

  logOut(): void {
    this.router.navigate(['/login']);
  }
}
