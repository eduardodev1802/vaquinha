import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu-estados',
  templateUrl: './sidemenu-estados.component.html',
  styleUrls: ['./sidemenu-estados.component.scss']
})
export class SidemenuEstadosComponent implements OnInit {
  @Output() filtrarEstadoNav = new EventEmitter();
  @Output() EscolherFiltro = new EventEmitter();
  @Input() Listaestados: any;
  @Input() EstadoAtivo: any
  mockStates = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goías' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraíma' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
  ];
  indexFiltro = null

  constructor(
    private readonly router: Router,
    private authAngular: AngularFireAuth,
  ) { }

  ngOnInit(): void {}

  logOut(): void {
    this.authAngular.auth.signOut();
    
    this.router.navigate(['/login']);
  }


  montarMenuEstado(item: any) {
    let estado;

    this.mockStates.map((resp) => {
      if (item === resp.value) {
        estado = resp.label;
      }
    })

    return estado;
  }

  verificarAtividade(item: any) {
    let status = null;

    if(item[0] === this.EstadoAtivo.uf) {
      status = true;
    } else {
      status = false;
    }

    return status
  }

  filtrar(item: any, index: any) {
    this.filtrarEstadoNav.emit(item);
    this.EscolherFiltro.emit(index)
  }
}
