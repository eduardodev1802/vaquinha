import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjetoService } from '../projeto/domains/service/projeto.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {
  dadosPessoais!: FormGroup;
  dadosPagamento!: FormGroup;
  selected = 0;
  idProjeto: any = null;
  projetoData: any;
  autor: any;

  constructor(private route: ActivatedRoute, private projetoService: ProjetoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.idProjeto = this.route.snapshot.paramMap.get('id');

    this.getDetalheProjeto(this.idProjeto);
    this.inicializarFormDadosPagamento();
  }


  inicializarFormDadosPagamento() {
    this.dadosPessoais = this.fb.group({
      valorContribuicao: new FormControl('', [Validators.required]),
      doacaoPlataforma: new FormControl(''),
      doacaoMensal: new FormControl(''),
      anonimo: new FormControl(''),
      emailContribuicao: new FormControl(''),
      nomeCompleto: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.dadosPessoais.controls[controlName].hasError(errorName);
  };


  getDetalheProjeto(id: any) {

    this.projetoService.getProjetoDetalhe(id).subscribe((resp: any) => {
      this.projetoData = resp.result[0];
      this.getUser();
      console.log('PROJETO DATA', this.projetoData);
    })
  }

  getUser() {
    this.projetoService.getUser(this.projetoData.owner).subscribe((resp: any) => {
      this.autor = resp;
      console.log('PROJETO DATA', this.autor);
    })
  }
  
  avancarDadosPagamento() {
    this.selected = 1;
  }

}
