import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HomeService } from './domains/services/projeto/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  listCategoriasFiltro = [{ id: 1, nome: 'Todos', filter: null }, { id: 2, nome: 'Recentes', filter: 'n' }, { id: 3, nome: 'Mais Comentados', filter: 'c' }, { id: 4, nome: 'Mais Curtidos', filter: 'l' }, { id: 5, nome: 'Encerrados', filter: 'f' }];
  filtroCategoria = 1;
  paginaNumero: number = 0
  projetos: any;
  mostrarVerMais: boolean = true;
  registrosTotais: number = 0;
  query: any = null;
  sort: any = null;

  constructor(
    private authAngular: AngularFireAuth,
    private router: Router,
    private homeService: HomeService,
    private dbFirestore: AngularFirestore
  ) {
    this.authAngular.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        return true;
      } else {
        this.router.navigate(['/login']);
        console.log('user is not logged in');
        return false;
      }
    });
  }

  ngOnInit(): void {
    this.buscarProjetos();
  }

  buscarProjetos() {
    this.homeService.getProjects(this.paginaNumero, this.query, this.sort).subscribe((item) => {

      if (item.result.length) {
        if (this.paginaNumero === 0) {
          this.salvarInformacoesProjeto(item.result, item);

          this.projetos = item.result;
          this.registrosTotais = item.totalRecords
        } else {
          this.salvarInformacoesProjeto(item.result, item);

          this.projetos = this.projetos.concat(item.result);
        }
      } else {
        this.mostrarVerMais = false;
      }
    })
  }

  salvarInformacoesProjeto(projets: any, data: any) {
    projets.map((item: any, index: number) => {
      item.valorDoado = data.sumDonations[index][1];
      item.likes = data.countLikes[index][1];
      item.donations = data.countDonations[index][1];
      item.comentarios = data.countComments[index][1];
    })

    this.salvarFotoProjeto(projets)
  }

  salvarFotoProjeto(projets: any) {
    projets.map((item: any, index: number) => {
      this.dbFirestore.collection('files').doc(item.mediaUid).ref.get().then((doc) => {
        if (doc.exists) {
          let resp: any = null;
          resp = doc.data();

          item.endereco = resp.address;
          item.thumb = resp.thumbAddress;
          item.mime = this.setMimeTipo(resp.mine)
        } else {
          item.endereco = null;
          item.thumb = null;
        }
      }).catch(function (error) {

      })
    })
  }

  pesquisarProjeto() {
    this.paginaNumero = 0;
    this.buscarProjetos();
  }

  verificarInputPesquisa() {
    if (this.query.length === 0) {
      this.query = null;
      this.paginaNumero = 0;
      this.buscarProjetos();
    }
  }

  setMimeTipo(mime: any): any {
    let tipo;

    if (mime === 'image/jpeg' || mime === 'image/png') {
      tipo = 2
    } else if (mime === 'video/mp4') {
      tipo = 3
    }
    else if (mime === null) {
      tipo = 1
    }

    return tipo
  }

  escolherFiltroCategoria(item: any) {
    this.query = null;
    this.filtroCategoria = item.id;
    this.sort = item.filter;

    console.log('SORT', this.sort)

    this.buscarProjetos();
  }

  mostrarMaisProjetos() {
    this.paginaNumero = this.paginaNumero + 6;
    this.buscarProjetos();
  }
}
