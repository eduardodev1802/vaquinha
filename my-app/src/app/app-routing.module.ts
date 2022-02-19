import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyComponent } from './features/privacy/privacy.component';
import { TermsComponent } from './features/terms/terms.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/projeto',
  },
  {
    path: 'projeto',
    loadChildren: () =>
      import('./features/projeto/projeto.module').then((m) => m.ProjetoModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'pagamento',
    loadChildren: () =>
      import('./features/pagamento/pagamento.module').then((m) => m.PagamentoModule),
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
