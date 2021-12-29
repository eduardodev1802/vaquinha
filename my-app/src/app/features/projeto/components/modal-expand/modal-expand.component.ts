import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-expand',
  templateUrl: './modal-expand.component.html',
  styleUrls: ['./modal-expand.component.scss']
})
export class ModalExpandComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Input() dataProjeto: any;

  constructor() { }

  ngOnInit(): void {
    console.log("DATA", this.dataProjeto)
  }

  montarIframeYoutube(url: string) {
    let novaURL = url.split('/');
    let urlYoutube = `https://www.youtube.com/embed/${novaURL[3]}`;
    return urlYoutube
  }

  fecharModal() {
    this.closeModal.emit();
  }
}
