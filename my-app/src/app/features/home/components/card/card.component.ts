import { trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { ModalLojaComponent } from 'src/app/shared/components/modal-loja/modal-loja.component';
import { HomeService } from '../../domains/services/projeto/home.service';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // TIPOS
  // 1 - YOUTUBE
  // 2 - IMAGEM
  // 3 - VIDEO
  @Input() projeto: any;
  categorias: any;

  constructor(private router: Router, private homeService: HomeService, private dialog: MatDialog) { }

  ngOnInit(): void {
   
  }

  arredondarKM(km: number) {
    return Math.round(km);
  }

  montarIframeYoutube(url: string) { 
    let novaURL = url.split('/');
    let urlYoutube = `https://www.youtube.com/embed/${novaURL[3]}`;
    return urlYoutube
  }

  calcularRegraDeTres(valor: number, total: number) {

    let porcentagem = (valor * 100) / total;

    let resultado = parseInt(porcentagem.toFixed(3));

    if (resultado >= 100) {
      resultado = 100;
    }

    return resultado
  }

  irParaProjeto() {
    this.router.navigate([`/projeto/detalhe/${this.projeto.id}`]);
  }

  irParaProjetoExpand(ancora: any) {

    const navigationExtras: NavigationExtras = {state: ancora};
    
    this.router.navigate([`/projeto/detalhe/${this.projeto.id}`], navigationExtras);
  }

  procurarCategoria(id: number) {

    let listaCategorias = [{"id":1,"title":"Alimentos","active":true},{"id":2,"title":"Construção","active":true},{"id":3,"title":"Luz","active":true},{"id":4,"title":"Mobiliário","active":true},{"id":5,"title":"Reforma","active":true},{"id":6,"title":"Remédios","active":true},{"id":7,"title":"Saúde","active":true},{"id":8,"title":"Tratamento","active":true},{"id":9,"title":"Vestuário","active":true}]

    let categoria: any = listaCategorias.find(categoria => categoria.id === id);
    return categoria.title;
  }

  abrirModalAppLoja() {
    this.dialog.open(ModalLojaComponent);

    return false;
  }
}
