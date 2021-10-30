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
    })
  }
}
