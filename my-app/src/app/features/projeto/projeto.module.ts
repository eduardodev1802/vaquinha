import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetoRoutingModule } from './projeto-routing.module';
import { DetalheProjetoComponent } from './pages/detalhe-projeto/detalhe-projeto.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { DescricaoComponent } from './components/descricao/descricao.component';
import { PrestacaoContasComponent } from './components/prestacao-contas/prestacao-contas.component';
import { ContribuicoesComponent } from './components/contribuicoes/contribuicoes.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { SafeDoisPipe } from 'src/app/pipes/safe-2.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    SafeDoisPipe,
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
    MatIconModule,
    MatSnackBarModule,
    MatExpansionModule,
    NgCircleProgressModule,
    ClipboardModule,
    ScrollToModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      showSubtitle: false,
      titleColor: "#FFBD00",
      imageWidth: 64,
      imageHeight: 64,
      responsive: true,
      titleFontSize: "80",
      subtitleFontSize: "80",
      unitsFontSize: "50",
      unitsColor: "#FFBD00"
    })
  ]
})
export class ProjetoModule { }
