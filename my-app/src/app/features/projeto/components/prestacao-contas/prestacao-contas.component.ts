import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private matDialog: MatDialog, private projetoService: ProjetoService, private dbFirestore: AngularFirestore) { }

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
        if(resp.itemType === 'I')  {
          this.buscarImagem(resp);
        }

        if(resp.itemType === 'V')  {
          this.buscarImagem(resp);
        }

        if(resp.itemType === 'Y')  {
          this.buscarImagem(resp);
        }
      })
    })
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
    })

  
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
  
}
