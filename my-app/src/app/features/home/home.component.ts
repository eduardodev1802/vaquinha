import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  listCategoriasFiltro = [{ id: 1, nome: 'Recentes' }, { id: 2, nome: 'Em Alta' }, { id: 3, nome: 'Mais Comentados' }, { id: 4, nome: 'Mais Curtidos' },{ id: 5, nome: 'Ativos' }];
  filtroCategoria = 1;

  projetos = ['1', '2', '3', '4', '5', '6']

  constructor() {}

  escolherFiltroCategoria(id: any) {
    this.filtroCategoria = id;
  }
}
