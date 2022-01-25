import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-expand-home',
  templateUrl: './modal-expand-home.component.html',
  styleUrls: ['./modal-expand-home.component.scss']
})
export class ModalExpandHomeComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() dataProjeto: any;

  constructor() { }

  ngOnInit(): void {}

  montarIframeYoutube(url: string) {
    let novaURL = url.split('/');
    let urlYoutube = `https://www.youtube.com/embed/${novaURL[3]}`;
    return urlYoutube
  }

  fecharModal() {
    this.closeModal.emit();
  }
}
