import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProjetoService } from '../../domains/service/projeto.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() comentarios: any;
  loading = false;
  comentariosData: any = []


  constructor(private projetoService: ProjetoService, private dbFirestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getUsuarioComentario()
  }

  getUsuarioComentario() {
    this.loading = true;

    this.comentarios.map((item: any, index: any) => {
      this.projetoService.getUser(item.comment.userId).subscribe((resp) => {
        this.comentarios[index].user = resp;
        this.capturarImageProjeto(item);
      })
    })

    this.getRespostasComentarios(this.comentarios);

    console.log("THIS", this.comentarios);
  }

  getRespostasComentarios(comentarios: any) {

    comentarios.map((item: any, index: any) => {

      comentarios[index].respostas = [];

      this.buscarRespostaPorID(item.comment.id, comentarios, index);
    })
    this.loading = false;
  }

  buscarRespostaPorID(id: any, comentarios: any, index: any) {

    this.projetoService.getRespostaComentarios(id).subscribe((resp: any) => {
      this.projetoService.getUser(resp[0].comment.userId).subscribe((respUser: any) => {
        if (resp.length > 0) {
          resp[0].user = respUser;
          comentarios[index].respostas.push(resp[0]);

          if(resp[0].user.picUid) {
            this.capturarImageProjeto(resp[0]);
          }
      
          this.buscarRespostaPorID(resp[0].comment.id, comentarios, index);
        } else {
          this.comentariosData.push(comentarios[index]);
        }
      })
    })
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
