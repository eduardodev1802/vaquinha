import { trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';



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

  constructor(private router: Router) { }

  ngOnInit(): void {}

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
}
function transition(arg0: string, arg1: any[]): import("@angular/animations").AnimationMetadata {
  throw new Error('Function not implemented.');
}

function style(arg0: { transform: string; opacity: number; }): any {
  throw new Error('Function not implemented.');
}

function animate(arg0: string, arg1: any): any {
  throw new Error('Function not implemented.');
}

function query(arg0: string, arg1: any[], arg2: { optional: boolean; }): any {
  throw new Error('Function not implemented.');
}

function stagger(arg0: string, arg1: any): any {
  throw new Error('Function not implemented.');
}

