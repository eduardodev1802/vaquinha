import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetoService } from '../../domains/service/projeto.service';

@Component({
  selector: 'app-detalhe-projeto',
  templateUrl: './detalhe-projeto.component.html',
  styleUrls: ['./detalhe-projeto.component.scss']
})
export class DetalheProjetoComponent implements OnInit {
  projetoData = { "result": [{ "id": 15, "subjectId": 9, "title": "Roupa para morador de rua", "description": "Precisamos ajudar essa criança urgente. Está passando muito frio.", "goal": 200.0, "finishDateTime": "30/10/2021 11:30", "publishDateTime": "06/06/2021 07:24", "peopleAmount": 25, "shareOnlyWithFriends": true, "mediaUid": "_77c24af0-d766-11eb-9870-036e7a910ff5_11a82ccb-7389-47db-91e5-b4c21a75739e", "usingCurrentLocation": true, "email": "batente2012@gmail.com", "phone": "61984338810", "whatsapp": true, "owner": "LPW28vPG86MQcuHwfeem4UypVFg1", "addressId": 198, "location": { "lat": -15.8072866, "lon": -48.0118476 }, "address": "Rua Los Angeles, Nova Cidade, RJ", "uf": "RJ", "city": "Macaé", "cep": "27949316", "status": "A", "distanceKm": 5552.341345979688, "visible": true, "paymentAccount": 2332 }], "currentPage": 0, "totalRecords": 1, "pageSize": -1, "countLikes": [[15, 0]], "countComments": [[15, 1]], "countDonations": [[15, 3]], "sumDonations": [[15, 15.6]] };
  idProjeto: any = null;
  tabDetalhe = 1;


  constructor(private projetoService: ProjetoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idProjeto = this.route.snapshot.paramMap.get('id');

    this.getDetalheProjeto(this.idProjeto);
  }

  getDetalheProjeto(id: any) {
    console.log('RESP', this.projetoData)

    this.projetoService.getProjetoDetalhe(id).subscribe((resp) => {

    })
  }

  escolherTabDetalhe(numeroTab: number) {
    this.tabDetalhe = numeroTab;
  }
}
