import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetoRoutingModule } from './projeto-routing.module';
import { DetalheProjetoComponent } from './pages/detalhe-projeto/detalhe-projeto.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DescricaoComponent } from './components/descricao/descricao.component';
import { PrestacaoContasComponent } from './components/prestacao-contas/prestacao-contas.component';
import { ContribuicoesComponent } from './components/contribuicoes/contribuicoes.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';

@NgModule({
  declarations: [
    DetalheProjetoComponent,
    DescricaoComponent,
    PrestacaoContasComponent,
    ContribuicoesComponent,
    HistoricoComponent,
    ComentariosComponent
  ],
  imports: [
    CommonModule,
    ProjetoRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProjetoModule { }
