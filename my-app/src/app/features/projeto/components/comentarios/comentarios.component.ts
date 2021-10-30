import { Component, Input, OnInit } from '@angular/core';
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


  constructor(private projetoService: ProjetoService) { }

  ngOnInit(): void {
    this.getUsuarioComentario()
  }

  getUsuarioComentario() {
    this.loading = true;

    this.comentarios.map((item: any, index: any) => {
      this.projetoService.getUser(item.comment.userId).subscribe((resp) => {
        this.comentarios[index].user = resp;
      })
    })

    this.getRespostasComentarios(this.comentarios)

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
          this.buscarRespostaPorID(resp[0].comment.id, comentarios, index);
        } else {
          this.comentariosData.push(comentarios[index]);
        }
      })
    })
  }
}
