import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProjetoService } from '../../domains/service/projeto.service';

@Component({
  selector: 'app-contribuicoes',
  templateUrl: './contribuicoes.component.html',
  styleUrls: ['./contribuicoes.component.scss']
})
export class ContribuicoesComponent implements OnInit {
  @Input() contribuicoes: any;
  constructor(private projetoService: ProjetoService, private dbFirestore: AngularFirestore) { }

  ngOnInit(): void {

    this.getUsuarioContribuicao();
  }

  getUsuarioContribuicao() {

    this.contribuicoes.map((item: any, index: any) => {
      this.projetoService.getUser(item.userId).subscribe((resp) => {
        this.contribuicoes[index].user = resp;
        this.capturarImageProjeto(item);
      })
    })


    console.log('THIS', this.contribuicoes)
  }

  capturarImageProjeto(item: any) {
    this.dbFirestore.collection('files').doc(item.user.picUid).ref.get().then((doc) => {
      if (doc.exists) {
        let resp: any = null;
        resp = doc.data();
        item.endereco = resp.address;
        item.thumb = resp.thumbAddress;
      } else {
        item.mediaDetalhe = null;
      }
    }).catch(function (error: any) {
      console.log('error', error)
    })
  }
}
