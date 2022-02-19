import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ProjetoService } from '../../domains/service/projeto.service';
import { ModalAvaliacaoComponent } from '../modal-avaliacao/modal-avaliacao.component';

@Component({
  selector: 'app-prestacao-contas',
  templateUrl: './prestacao-contas.component.html',
  styleUrls: ['./prestacao-contas.component.scss']
})
export class PrestacaoContasComponent implements OnInit {
  @Input() listaPrestacaoData: any;
  @Input() ProjetoDetalhe: any;
  @Input() IdUsuarioLogado: any;
  token: any;
  viewAvaliacao = true;


  constructor(private authAngular: AngularFireAuth, private matDialog: MatDialog, private projetoService: ProjetoService, private dbFirestore: AngularFirestore) { 
  }

  ngOnInit(): void {
    this.getInformacoesPrestacao()
  }

  getInformacoesPrestacao() {
    this.getUser();
    this.verificarTipoPrestacao();
    this.getAvaliacoes();
  }

  getUser() {
    this.listaPrestacaoData.map((item: any) => {
      this.projetoService.getUser(item.value1.userId).subscribe((res: any) => {
        item.onwer = res;
      })
    })
  }

  verificarTipoPrestacao() {
    this.listaPrestacaoData.map((item: any) => {
      item.value2.map((resp: any) => {

        console.log('RESP', resp.itemType);

        if (resp.itemType === 'I') {
          this.buscarImagem(resp);
        }

        if (resp.itemType === 'V') {
          this.buscarImagem(resp);
        }

        if (resp.itemType === 'Y') {
          this.buscarImagem(resp);
        }

        if (resp.itemType === 'D') {
          this.buscarImagem(resp);
        }
      })
    })

    console.log('THIIIS', this.listaPrestacaoData)
  }

  montarIframeYoutube(url: string) {
    let novaURL = url.split('/');
    let urlYoutube = `https://www.youtube.com/embed/${novaURL[3]}`;
    return urlYoutube
  }

  buscarImagem(itemContribuicao: any) {
    this.dbFirestore.collection('files').doc(itemContribuicao.value).ref.get().then((doc) => {
      if (doc.exists) {
        let resp: any = null;
        resp = doc.data();
        itemContribuicao.detalheContribuicao = resp;
      }
    }).catch(function (error: any) {
      console.log('error', error)
    })
  }


  getAvaliacoes() {
    this.projetoService.getAvaliacoes(this.ProjetoDetalhe.id).subscribe((resp: any) => {
      this.ProjetoDetalhe.avaliacoes = resp;
      this.ProjetoDetalhe.avaliacoes.valor = this.somarAvaliacoes(this.ProjetoDetalhe.avaliacoes);
      this.ProjetoDetalhe.avaliacoes.media = this.mediaAvaliacoes(this.ProjetoDetalhe.avaliacoes.valor);
      this.ProjetoDetalhe.avaliacoes.qtd = resp.length
      this.verificarProjetoAvaliacao();
    })
  }

  verificarProjetoAvaliacao() {

    console.log('USUARIO LOGADO', this.IdUsuarioLogado);

    if (this.IdUsuarioLogado) {
      this.ProjetoDetalhe.avaliacoes.map((item: any) => {
        if (item.userId === this.IdUsuarioLogado) {

          console.log('item', item.userId);

          this.viewAvaliacao = false;
        }
      })
    }

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
  }

}
