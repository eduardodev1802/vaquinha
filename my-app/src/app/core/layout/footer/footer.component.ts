import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalLojaComponent } from 'src/app/shared/components/modal-loja/modal-loja.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirModalAppLoja() {
    this.dialog.open(ModalLojaComponent);
  }
}
