import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contribuicoes',
  templateUrl: './contribuicoes.component.html',
  styleUrls: ['./contribuicoes.component.scss']
})
export class ContribuicoesComponent implements OnInit {
  @Input() contribuicoes: any;
  constructor() { }

  ngOnInit(): void {
    console.log('Contribuicoes', this.contribuicoes)
  }

}
