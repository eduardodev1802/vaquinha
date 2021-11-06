import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProjetoService } from '../../domains/service/projeto.service';

@Component({
  selector: 'app-prestacao-contas',
  templateUrl: './prestacao-contas.component.html',
  styleUrls: ['./prestacao-contas.component.scss']
})
export class PrestacaoContasComponent implements OnInit {
  @Input() listaPrestacaoData: any;
  constructor(private projetoService: ProjetoService, private dbFirestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getInformacoesPrestacao()
  }

  getInformacoesPrestacao() {
    this.getUser();
    this.verificarTipoPrestacao();

    console.log('THIS', this.listaPrestacaoData);
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
        
        console.log('TIPO', resp.itemType);

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
  
}
