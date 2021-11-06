import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  @Input() historico: any;

  constructor(private location: Location, private dbFirestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    this.capturarImageProjeto()
    console.log('THIS Historico', this.historico);
  }

  capturarImageProjeto() {

    this.historico.result.map((item: any) => {
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
}
