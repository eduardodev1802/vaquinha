import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetoService } from '../../domains/service/projeto.service';

@Component({
  selector: 'app-detalhe-projeto',
  templateUrl: './detalhe-projeto.component.html',
  styleUrls: ['./detalhe-projeto.component.scss']
})
export class DetalheProjetoComponent implements OnInit {
  projetoData: any = null;
  idProjeto: any = null;
  tabDetalhe = 1;
  ListaComentarios: any;
  listaContribuicao: any;
  timelineData: any;
  arrecadado: any;
  porcentagem: any;

  constructor(private projetoService: ProjetoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idProjeto = this.route.snapshot.paramMap.get('id');

    this.getDetalheProjeto(this.idProjeto);
  }

  getDetalheProjeto(id: any) {
    
    this.projetoService.getProjetoDetalhe(id).subscribe((resp) => {
      this.projetoData = resp;

      this.getComentarios(this.idProjeto);
      this.getContribuicoes(this.idProjeto)
      this.getTimeline(this.projetoData);
    })
  }

  escolherTabDetalhe(numeroTab: number) {
    this.tabDetalhe = numeroTab;
  }

  getComentarios(id: any) { 
    this.projetoService.getComentarios(id).subscribe((resp) => {
      this.ListaComentarios = resp;
    }) 
  }

  getContribuicoes(id: any) {
    this.projetoService.getContribuicoes(id).subscribe((resp) => {
      this.listaContribuicao = resp;

      this.arrecadado = this.somarContribuicoes(this.listaContribuicao);
      this.porcentagem = this.calcularRegraDeTres(this.arrecadado, this.projetoData.result[0].goal);
    })
  }

  somarContribuicoes(data: any) {
    let soma = 0;

    data.forEach((element: any) => {
      soma += element.ammount;
    });

    return soma;
  }

  calcularRegraDeTres(valor: number, total: number) {

    let porcentagem = (valor * 100) / total;

    let resultado = parseInt(porcentagem.toFixed(3));

    return resultado
  }

  getTimeline(data: any) {
    this.projetoService.getTimeLine(data.result[0].owner).subscribe((resp) => {
      this.timelineData = resp;
    })
  }
}
