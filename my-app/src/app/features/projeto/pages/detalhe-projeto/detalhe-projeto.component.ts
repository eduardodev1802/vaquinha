import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ModalLojaComponent } from 'src/app/shared/components/modal-loja/modal-loja.component';
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
  listaPrestacaoContas: any = [];
  listaProjetosUsuario: any = [];
  timelineData: any;
  arrecadado: any;
  porcentagem: any;
  urlCompartilhamento: any;
  categorias: any;
  modalExpande = false;
  dataModalItem: any = null
  pageSizeHistorico = 10;
  idUnicoOwner = null;
  idUsuarioLogado = null;
  viewPrestacao = false;
  notaAutor = 0

  constructor(private scrollToService: ScrollToService, private dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar, private clipboard: Clipboard, private authAngular: AngularFireAuth, private projetoService: ProjetoService, private route: ActivatedRoute, private dbFirestore: AngularFirestore) {
    const navigation: any = this.router.getCurrentNavigation();
    const state = navigation.extras.state;

    if (parseInt(state) === 1) {
      this.escolherTabDetalhe(3);
    }

    if (parseInt(state) === 2) {
      this.escolherTabDetalhe(5);
    }
  }

  ngOnInit(): void {
    this.urlCompartilhamento = window.location.href
    this.idProjeto = this.route.snapshot.paramMap.get('id');

    this.authAngular.user.subscribe((user: any) => {
      this.idUsuarioLogado = user.uid;
      this.viewPrestacao = true;
    })

    this.viewPrestacao = true;
    this.getDetalheProjeto(this.idProjeto);
  }

  getDetalheProjeto(id: any) {

    this.projetoService.getProjetoDetalhe(id).subscribe((resp) => {
      this.salvarFotoProjeto(resp.result);
      this.getUser(resp.result[0].owner);
      this.getTodosProjetos(resp.result[0].owner);
      this.projetoData = resp;
      this.getPrestadorContas(this.idProjeto)
      this.getComentarios(this.idProjeto);
      this.getContribuicoes(this.idProjeto)
      this.getTimeline(this.projetoData);
      this.getCategorias();
      this.verificarProjetoFinalizado();
    })
  }

  verificarProjetoFinalizado() {
    if (this.projetoData.result[0].status === 'F') {
      this.escolherTabDetalhe(2);
    }
  }

  getPrestadorContas(id: any) {
    this.projetoService.getPrestacaoContas(id).subscribe((resp: any) => {
      this.listaPrestacaoContas = resp;
    }, (err) => {
      this.listaPrestacaoContas = null;
    })
  }

  getTodosProjetos(id: any) {
    this.projetoService.getTodosProjetos(id, this.pageSizeHistorico).subscribe((resp) => {
      this.listaProjetosUsuario = resp;
      this.capturarNotaAutor(this.listaProjetosUsuario.result, resp.totalRecords)
    })
  }

  capturarNotaAutor(projetos: any, total: any) {
    let sum = 0;
    for (let key in projetos) {

      this.projetoService.getAvaliacoes(projetos[key].id).subscribe((resp: any) => {
        resp.map((avaliacao: any) => {
          sum +=  avaliacao.value
          this.notaAutor = sum / total;
        })
      })
    }
  }

  contarMediaNota(projetos: any) {
    projetos.map((item: any) => {
    })
  }

  getUser(id: any) {
    this.projetoService.getUser(id).subscribe((resp) => {
      this.projetoData.result[0].owner = resp;

      this.buscarFotoUsuario(this.projetoData.result[0].owner.picUid)
    })
  }

  montarIframeYoutube(url: string) {
    let novaURL = url.split('/');
    let urlYoutube = `https://www.youtube.com/embed/${novaURL[3]}`;
    return urlYoutube
  }

  buscarFotoUsuario(id: any) {
    this.dbFirestore.collection('files').doc(id).ref.get().then((doc) => {
      if (doc.exists) {
        let resp: any = null;
        resp = doc.data();
        this.projetoData.result[0].owner.fotoUsuario = resp.address;
      } else {
        this.projetoData.result[0].owner.fotoUsuario = null;
      }
    }).catch(function (error: any) {
      console.log('error', error)
    })
  }

  salvarFotoProjeto(projets: any) {
    projets.map((item: any, index: number) => {
      if (item.mediaUid) {
        this.dbFirestore.collection('files').doc(item.mediaUid).ref.get().then((doc) => {
          if (doc) {
            let resp: any = null;
            resp = doc.data();
            item.endereco = resp.address;
            item.thumb = resp.thumbAddress;
            item.mime = this.setMimeTipo(resp.mine)
          } else {
            item.endereco = null;
            item.thumb = null;
          }
        }).catch(function (error: any) {
          console.log('error', error)
        })
      } else {
        item.endereco = null;
        item.thumb = null;
      }
    })
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

  escolherTabDetalhe(numeroTab: number) {
    this.tabDetalhe = numeroTab;

    this.scrollToService.scrollTo({
      target: 'content',
      duration: 650,
      easing: 'easeOutElastic',
    });
  }

  getComentarios(id: any) {
    this.projetoService.getComentarios(id).subscribe((resp) => {
      this.ListaComentarios = resp;
    })
  }

  getCategorias() {
    this.projetoService.getCategorias().subscribe((resp) => {
      this.categorias = resp;
    })
  }

  buscarCategoria(id: number) {
    let categoria: any = null;

    this.categorias.map((item: any) => {
      if (item.id === id) categoria = item;
    })

    return categoria.title;
  }

  getContribuicoes(id: any) {
    this.projetoService.getContribuicoes(id).subscribe((resp) => {
      this.listaContribuicao = resp;

      this.arrecadado = this.somarContribuicoes(this.listaContribuicao);
      this.porcentagem = this.calcularRegraDeTres(this.arrecadado, this.projetoData.result[0].goal);
    })
  }

  irParaLocalizacao() {
    window.open(`https://www.google.com.br/maps/search/${this.projetoData.result[0].location.lat},${this.projetoData.result[0].location.lon}`, '_blank');
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

    if (resultado >= 100) {
      resultado = 100;
    }

    return resultado
  }

  getTimeline(data: any) {

    this.idUnicoOwner = data.result[0].owner;

    this.projetoService.getTimeLine(data.result[0].owner, this.pageSizeHistorico).subscribe((resp) => {
      this.timelineData = resp;
    })
  }

  fb(e: any) {
    let url = 'https://xloto.com.br/gestao';
    e.preventDefault();
    let facebookWindow = window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${this.urlCompartilhamento}`,
      'facebook-popup',
      'height=350,width=600'
    );

    return false;
  }

  compartilharInstagram() {
    this.clipboard.copy(this.urlCompartilhamento);
    let durationInSeconds = 2;

    this._snackBar.openFromComponent(AlertComponent, {
      duration: durationInSeconds * 1000,
      verticalPosition: "top"
    });

  }

  irParaPagamento() {
    this.router.navigate([`/pagamento/detalhe/${this.idProjeto}`]);
  }

  toggleModal() {
    this.dataModalItem = this.projetoData.result[0];
    this.modalExpande = !this.modalExpande;
  }

  adicionarPaginaHistorico() {
    this.projetoData = null;
    this.pageSizeHistorico = this.pageSizeHistorico + 5;

    this.getDetalheProjeto(this.idProjeto);
  }
}


@Component({
  selector: 'alert-component',
  templateUrl: 'alert.component.html',
  styles: [
    `
    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
})
export class AlertComponent { }
