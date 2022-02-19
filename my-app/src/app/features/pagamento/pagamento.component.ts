import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProjetoService } from '../projeto/domains/service/projeto.service';
import { AlertComponent } from '../projeto/pages/detalhe-projeto/detalhe-projeto.component';
import { Pagamento } from './domains/class/pagamento';
import { PagamentoService } from './domains/services/pagamento.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {
  dadosPessoais!: FormGroup;
  dadosCartaoCredito!: FormGroup;
  dadosBoleto!: FormGroup;
  metodoPagamento: number = 0;
  _pagamento = new Pagamento();
  selected = 0;
  idProjeto: any = null;
  projetoData: any;
  autor: any;
  resultadoPagamento: any = null;
  payload: any = null;


  constructor(private _location: Location, private _snackBar: MatSnackBar, private clipboard: Clipboard, private authAngular: AngularFireAuth, private pagamentoService: PagamentoService, private route: ActivatedRoute, private projetoService: ProjetoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.idProjeto = this.route.snapshot.paramMap.get('id');

    this.getDetalheProjeto(this.idProjeto);
    this.inicializarFormDadosPagamento();
    this.inicializarFormCartaoCredito();
    this.inicializarFormBoleto();
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


  inicializarFormCartaoCredito() {
    this.dadosCartaoCredito = this.fb.group({
      numeroCartao: new FormControl('', [Validators.required]),
      vencimento: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
      nomeCompletoCartao: new FormControl('', [Validators.required]),
      cepCartao: new FormControl('', [Validators.required]),
      enderecoCartao: new FormControl('', [Validators.required]),
      bairroCartao: new FormControl('', [Validators.required]),
      complementoCartao: new FormControl(''),
      cidadeCartao: new FormControl('', [Validators.required]),
      estadoCartao: new FormControl('', [Validators.required]),
    });
  }


  inicializarFormBoleto() {
    this.dadosBoleto = this.fb.group({
      cepBoleto: new FormControl('', [Validators.required]),
      enderecoBoleto: new FormControl('', [Validators.required]),
      bairroBoleto: new FormControl('', [Validators.required]),
      complementoBoleto: new FormControl(''),
      cidadeBoleto: new FormControl('', [Validators.required]),
      estadoBoleto: new FormControl('', [Validators.required]),
    });
  }

  copiarPIX() {
    this.clipboard.copy(this.resultadoPagamento.pix.key);
    let durationInSeconds = 2;

    this._snackBar.openFromComponent(AlertComponent, {
      duration: durationInSeconds * 1000,
    });
  }


  copiarBoleto() {
    this.clipboard.copy(this.resultadoPagamento.billet.number);
    let durationInSeconds = 2;

    this._snackBar.openFromComponent(AlertComponent, {
      duration: durationInSeconds * 1000,
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.dadosPessoais.controls[controlName].hasError(errorName);
  }

  public checkErrorCartao = (controlName: string, errorName: string) => {
    return this.dadosCartaoCredito.controls[controlName].hasError(errorName);
  };

  public checkErrorBoleto = (controlName: string, errorName: string) => {
    return this.dadosBoleto.controls[controlName].hasError(errorName);
  };


  getDetalheProjeto(id: any) {

    this.projetoService.getProjetoDetalhe(id).subscribe((resp: any) => {
      this.projetoData = resp.result[0];
      this.getUser();
    })
  }

  getUser() {
    this.projetoService.getUser(this.projetoData.owner).subscribe((resp: any) => {
      this.autor = resp;
    })
  }

  avancarDadosPagamento() {
    this.selected = 1;
  }

  escolherMetodoPagamento(metodo: any) {
    this.metodoPagamento = metodo;

    if(metodo == 1){
      this.finalizarPagamento(2);
    }
  }

  calculoPorcentagem(num: any, amount: any){
    return num*amount/100;
  }

  finalizarPagamento(tipoPagamento: number) {

    let pix = null;
    let endereco = null;
    let boleto = null;
    let payload: any = null;
    let cartaoCredito: any = null;
    let fracoes = [
      {
        "accountNumber": parseFloat(this.projetoData.paymentAccount),
        "ammount": parseFloat(this.dadosPessoais.value.valorContribuicao),
        "description": "Valor para o projeto"
      }
    ]

    if(this.dadosPessoais.value.doacaoPlataforma == true) {
     let result = this.calculoPorcentagem(10, parseFloat(this.dadosPessoais.value.valorContribuicao));

     fracoes.push({
      "accountNumber": 1,
      "ammount": result,
      "description": "Valor para plataforma"
     })
    }

    if (tipoPagamento === 1) {
      cartaoCredito = this._pagamento.montarCartaoCredito(this.dadosCartaoCredito.value, this.dadosPessoais.value);
      cartaoCredito.flag = this._pagamento.detectCardType(this.dadosCartaoCredito.value.numeroCartao);
      endereco = this._pagamento.montarEnderecoCartao(this.dadosCartaoCredito.value);
    }

    if (tipoPagamento === 2) {
      pix = this._pagamento.montarPIX(this.dadosPessoais.value)
    }

    if (tipoPagamento === 3) {
      boleto = this._pagamento.montarBoleto(this.dadosPessoais.value);
      endereco = this._pagamento.montarEnderecoBoleto(this.dadosBoleto.value);
    }

    payload = this._pagamento.montarPayload(this.projetoData, this.autor, this.dadosPessoais.value, pix, endereco, fracoes, boleto, cartaoCredito);
 
    this.pagamentoService.fazerPagamento(payload).subscribe((resp: any) => {
      this.resultadoPagamento = resp;

      if(tipoPagamento === 3) {
        this.metodoPagamento = 3
      }

      if(tipoPagamento === 1) {
        this.metodoPagamento = 4
      }
    }, (err) => {
      window.alert(err.error);
    })   
  }


  voltarPaginaAnterior() {
    this._location.back();
  }


}
