import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagamentoComponent } from './pagamento.component';

const routes: Routes = [
  { path: 'detalhe/:id', component: PagamentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }
