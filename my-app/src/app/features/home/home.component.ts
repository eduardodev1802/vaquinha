import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HomeService } from './domains/services/projeto/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  listCategoriasFiltro = [{ id: 1, nome: 'Todos', filter: null }, { id: 2, nome: 'Recentes', filter: 'n' }, { id: 3, nome: 'Mais Comentados', filter: 'c' }, { id: 4, nome: 'Mais Curtidos', filter: 'l' }, { id: 5, nome: 'Encerrados', filter: 'f' }];
  filtroCategoria = 1;
  paginaNumero: number = 0
  projetos: any;
  mostrarVerMais: boolean = true;
  categorias: any = null;
  categoriaEscolhida: any = null;
  registrosTotais: number = 0;
  query: any = null;
  sort: any = 'N';
  latitude: any = null;
  longitude: any = null;
  ufFiltro: any = null;
  map: any;
  marker: any
  estados: any = [
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
  ]
  estadosPosicoes: any = [];
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
  menulateralEstados = false;
  indexFiltro: any;
  idUF: any = null;

  // MAP
  @ViewChild('gmap') gmapElement: any;

  constructor(
    private authAngular: AngularFireAuth,
    private router: Router,
    private homeService: HomeService,
    private dbFirestore: AngularFirestore
  ) {
    this.authAngular.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        return true;
      } else {
        this.router.navigate(['/login']);
        console.log('user is not logged in');
        return false;
      }
    });
  }

  ngOnInit(): void {
    this.getEstados();
    this.buscarMinhaPosicao(null);
    this.getCategorias();
  }

  ngAfterViewInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp)
  }

  buscarMinhaPosicao(filtroUF: any) {

    let coordenadas: any = {
      latitude: null,
      longitude: null
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.buscarProjetos(position.coords.latitude, position.coords.longitude, filtroUF)
      });
    } else {
      coordenadas.latitude = 15.7965037;
      coordenadas.longitude = 47.8859936;

      this.buscarProjetos(coordenadas.latitude, coordenadas.longitude, filtroUF)
    }
  }


  buscarProjetos(lat: any, long: any, filtroUF: any) {

    let objLatitude = {
      latitude: lat,
      longitude: long
    }

    if (filtroUF) {
      objLatitude = {
        latitude: filtroUF.lat,
        longitude: filtroUF.lon
      }
    }

    this.homeService.getProjects(this.paginaNumero, this.query, this.sort, this.categoriaEscolhida, objLatitude.latitude, objLatitude.longitude, filtroUF).subscribe((item) => {
      if (item.result.length) {
        if (this.paginaNumero === 0) {
          this.salvarInformacoesProjeto(item.result, item);
          this.projetos = item.result;
          this.registrosTotais = item.totalRecords;
          this.separarEstados();
          this.setMapa(lat, long, filtroUF)
        } else {
          this.salvarInformacoesProjeto(item.result, item);
          this.projetos = this.projetos.concat(item.result);
          this.registrosTotais = item.
            totalRecords;
          this.separarEstados();
          this.setMapa(lat, long, filtroUF)
        }
      } else {
        this.mostrarVerMais = false;
      }
    })
  }

  salvarInformacoesProjeto(projets: any, data: any) {
    projets.map((item: any, index: number) => {
      item.valorDoado = data.sumDonations[index][1];
      item.likes = data.countLikes[index][1];
      item.donations = data.countDonations[index][1];
      item.comentarios = data.countComments[index][1];
    })

    this.salvarFotoProjeto(projets)
  }

  salvarFotoProjeto(projets: any) {
    projets.map((item: any, index: number) => {

      if(item.mediaUid) {
        this.dbFirestore.collection('files').doc(item.mediaUid).ref.get().then((doc) => {
          if (doc.exists) {
            let resp: any = null;
            resp = doc.data();
            item.endereco = resp.address;
            item.thumb = resp.thumbAddress;
            item.mime = this.setMimeTipo(resp.mine)
          } else {
            item.endereco = null;
            item.thumb = null;
          }
        }).catch(function (error) {
  
        })
      }

    })
  }

  getEstados() {
    this.homeService.getEstados().subscribe((item) => {
      this.estados = item;

      this.estados = this.estados.sort((a: any, b: any) => b[1] - a[1]);
      this.getEstadosPosicao(this.estados);
    })
  }

  getEstadosPosicao(estados: any) {
    this.homeService.getEstadosPosicoes().subscribe((item) => {
      this.estadosPosicoes = item;

      estados.map((value: any) => {
      })
    })
  }


  zeraBuscaProjeto() {

    this.query = null;

    this.pesquisarProjeto();
  }

  verificarCampoPesquisa() {
    if (this.query === '' || this.query === null) return false;

    return true
  }

  pesquisarProjeto() {
    this.ufFiltro = null;
    this.sort = null;
    this.categoriaEscolhida = null;

    this.paginaNumero = 0;
    this.buscarMinhaPosicao(null);
  }

  verificarInputPesquisa() {
    if (this.query.length === 0) {
      this.query = null;
      this.paginaNumero = 0;
      this.buscarMinhaPosicao(null);
    }
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

  escolherFiltroCategoria(item: any) {
    this.paginaNumero = 0
    this.query = null;
    this.ufFiltro = null;
    this.sort = item.filter;
    this.filtroCategoria = item.id;
    this.buscarMinhaPosicao(null);
  }

  mudarCategoriaProjeto(id: any) {
    this.categoriaEscolhida = id;

    this.escolherCategoriaProjeto();
  }

  escolherCategoriaProjeto() {
    this.paginaNumero = 0;
    this.query = null;
    this.sort = null;
    this.ufFiltro = null;

    this.buscarMinhaPosicao(null);
  }

  mostrarMaisProjetos() {
    this.paginaNumero = this.paginaNumero + 6;
    this.query = null;
    this.ufFiltro = null;
    this.categoriaEscolhida = null;

    this.buscarMinhaPosicao(null);
  }

  getCategorias() {
    this.homeService.getCategorias().subscribe((item) => {
      this.categorias = item;
    })
  }


  setMapa(latitude: any, longitude: any, ufItem: any) {

    let marker: any;

    this.projetos.map((item: any, index: number) => {

      if (ufItem === null) {
        this.map.panTo({ lat: item.location.lat, lng: item.location.lon });


        marker = new google.maps.Marker({
          position: { lat: item.location.lat, lng: item.location.lon },
          map: this.map,
          title: 'Got you!',
          icon: '/assets/img/icon/icon-maps.png',
          place: item.title,

        });
      }

      if (ufItem) {

        if (ufItem.uf === item.uf) {

          this.map.panTo({ lat: item.location.lat, lng: item.location.lon });

          marker = new google.maps.Marker({
            position: { lat: item.location.lat, lng: item.location.lon },
            map: this.map,
            title: 'Got you!',
            icon: '/assets/img/icon/icon-maps.png',
            place: item.title
          });
        }

      }

      marker.setMap(this.map)
    })
  }

  separarEstados() {
    this.projetos.map((item: any, index: number) => {
      this.estados.map((resp: any) => {
        if (item.uf === resp.value) {
          resp.qtd = []
          resp.qtd.push(item);
        }
      })
    })
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

  buscarCategorias(valor: any) {
    let result: any = null;

    this.categorias.map((item: any) => {
      if (item.id === valor) {
        result = item;
      }
    })

    return result.title
  }

  filtrarPorUF(item: any) {

    this.idUF = item[0];

    this.estadosPosicoes.map((resp: any) => {
      if (item[0] === resp.uf) {
        this.ufFiltro = resp;
      }
    })

    this.query = null;
    this.sort = null;
    this.categoriaEscolhida = null

    this.buscarMinhaPosicao(this.ufFiltro);
  }

  addIndexFiltro(event: any) {
    this.indexFiltro = event;
  }

  filtrarPorUFMobile(item: any) {
    this.toggleMenuEstadosLateral();
    this.estadosPosicoes.map((resp: any) => {
      if (item[0] === resp.uf) {
        this.ufFiltro = resp;
      }
    })

    this.query = null;
    this.sort = null;
    this.categoriaEscolhida = null

    this.buscarMinhaPosicao(this.ufFiltro);
  }

  toggleMenuEstadosLateral() {
    this.menulateralEstados = !this.menulateralEstados;
  }

}
