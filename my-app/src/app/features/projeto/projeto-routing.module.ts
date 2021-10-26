import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheProjetoComponent } from './pages/detalhe-projeto/detalhe-projeto.component';

const routes: Routes = [
  { path: 'detalhe/:id', component: DetalheProjetoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule { }
