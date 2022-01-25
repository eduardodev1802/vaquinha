import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProjetoService } from '../../domains/service/projeto.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAvaliacaoComponent } from '../modal-avaliacao/modal-avaliacao.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {
  @Output() addMaisProjetos = new EventEmitter();
  @Input() historico: any;
  @Input() idOwner: any;
  @Input() nomeAutor: any;
  modalExpande = false;
  dataModalItem = null;
  loading: boolean = false;
  pageSizeHistorico = 10;
  quantidadeProjetos: any = 10;
  notaAutor = 0

  constructor(private matDialog: MatDialog, private location: Location, private dbFirestore: AngularFirestore, private router: Router, private projetoService: ProjetoService, private authAngular: AngularFireAuth) { }

  ngOnInit(): void {
    this.capturarImageProjeto(this.historico.result);
    this.buscarTodosProjetos(this.historico);
  }

  buscarTodosProjetos(historico: any) {
    this.authAngular.user.subscribe((user: any) => {
      this.projetoService.getTodosProjetos(this.idOwner, user.ya, historico.totalRecords).subscribe((resp) => {
        this.capturarNotaAutor(resp.result);
      })
    })
  }

  capturarNotaAutor(projetos: any) {
    let sum = 0;
    for (let key in projetos) {

      this.projetoService.getAvaliacoes(projetos[key].id).subscribe((resp: any) => {
        resp.map((avaliacao: any) => {
          sum +=  avaliacao.value
          this.notaAutor = sum / this.historico.totalRecords;
        })
      })
    }


  }

  capturarImageProjeto(historico: any) {
    this.loading = true;
    historico.map((item: any) => {

      this.projetoService.getAvaliacoes(item.id).subscribe((resp: any) => {
        item.avaliacoes = resp;
        item.avaliacoes.valor = this.somarAvaliacoes(item.avaliacoes);
        item.avaliacoes.media = this.mediaAvaliacoes(item.avaliacoes.valor);
        item.avaliacoes.qtd = resp.length
      })

      if (item.mediaUid) {
        this.dbFirestore.collection('files').doc(item.mediaUid).ref.get().then((doc) => {
          if (doc.exists) {
            let resp: any = null;
            resp = doc.data();
            item.endereco = resp.address;
            item.thumb = resp.thumbAddress;
            item.mime = this.setMimeTipo(resp.mine)
          } else {
            item.mediaDetalhe = null;
          }
        }).catch(function (error: any) {
          console.log('error', error)
        })
      }
      else {
        item.endereco = null;
        item.thumb = null;
      }

    })
  }

  montarIframeYoutube(url: string) {
    let novaURL = url.split('/');
    let urlYoutube = `https://www.youtube.com/embed/${novaURL[3]}`;
    return urlYoutube
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

  irParaProjeto(item: any) {
    let url = `/projeto/detalhe/${item.id}`;
    this.location.go(url);
    window.location.reload()
  }

  toggleModal(item: any) {
    this.dataModalItem = item;
    this.modalExpande = !this.modalExpande;
  }

  procurarCategoria(id: number) {

    let listaCategorias = [{ "id": 1, "title": "Alimentos", "active": true }, { "id": 2, "title": "Construção", "active": true }, { "id": 3, "title": "Luz", "active": true }, { "id": 4, "title": "Mobiliário", "active": true }, { "id": 5, "title": "Reforma", "active": true }, { "id": 6, "title": "Remédios", "active": true }, { "id": 7, "title": "Saúde", "active": true }, { "id": 8, "title": "Tratamento", "active": true }, { "id": 9, "title": "Vestuário", "active": true }]

    let categoria: any = listaCategorias.find(categoria => categoria.id === id);
    return categoria.title;
  }


  getAvaliacoes(historico: any) {
    historico.result.map((item: any) => {
      this.projetoService.getAvaliacoes(item.id).subscribe((resp: any) => {
        item.avaliacoes = resp;
        item.avaliacoes.valor = this.somarAvaliacoes(item.avaliacoes);
        item.avaliacoes.media = this.mediaAvaliacoes(item.avaliacoes.valor);
        item.avaliacoes.qtd = resp.length
      })
    })

    this.loading = false;
  }

  somarAvaliacoes(item: any) {
    let soma = 0;
    item.map((avaliacao: any) => {
      soma = soma + avaliacao.value;
    })

    return soma;
  }

  mediaAvaliacoes(item: any) {
    return item / 5;
  }

  abrirModalAvaliacao(item: any) {
    let dialogRef = this.matDialog.open(ModalAvaliacaoComponent, {
      width: '600px',
      data: {
        item: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      item.avaliacoes.qtd = item.avaliacoes.qtd + 1;
    });
  }

  formatarData(data: any) {
    let dataFormatada = data.split('/');
    let dia = dataFormatada[0];
    let mes = this.buscarMes(dataFormatada[1]);
    let ano = dataFormatada[2].substring(0, 4);

    return `${dia} ${mes} ${ano}`;
  }

  buscarMes(mes: any) {
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let returnMes = null;

    if (mes === '01') returnMes = meses[0];
    if (mes === '02') returnMes = meses[1];
    if (mes === '03') returnMes = meses[2];
    if (mes === '04') returnMes = meses[3];
    if (mes === '05') returnMes = meses[4];
    if (mes === '06') returnMes = meses[5];
    if (mes === '07') returnMes = meses[6];
    if (mes === '08') returnMes = meses[7];
    if (mes === '09') returnMes = meses[8];
    if (mes === '10') returnMes = meses[9];
    if (mes === '11') returnMes = meses[10];
    if (mes === '12') returnMes = meses[11];

    return returnMes
  }

  adicionarHistorico() {

    this.pageSizeHistorico = this.pageSizeHistorico + 5;

    this.getTimeline();
  }

  getTimeline() {
    this.projetoService.getTimeLine(this.idOwner, this.pageSizeHistorico).subscribe((resp) => {
      this.historico = null;
      this.historico = resp;

      this.historico.result.map((item: any) => {

        this.projetoService.getAvaliacoes(item.id).subscribe((resp: any) => {
          item.avaliacoes = resp;
          item.avaliacoes.valor = this.somarAvaliacoes(item.avaliacoes);
          item.avaliacoes.media = this.mediaAvaliacoes(item.avaliacoes.valor);
          item.avaliacoes.qtd = resp.length
        })


        if (item.mediaUid) {
          this.dbFirestore.collection('files').doc(item.mediaUid).ref.get().then((doc) => {
            if (doc.exists) {
              let resp: any = null;
              resp = doc.data();
              item.endereco = resp.address;
              item.thumb = resp.thumbAddress;
              item.mime = this.setMimeTipo(resp.mine)
            } else {
              item.mediaDetalhe = null;
            }
          }).catch(function (error: any) {
            console.log('error', error)
          })
        }
        else {
          item.endereco = null;
          item.thumb = null;
        }
      })
    })
  }
}
