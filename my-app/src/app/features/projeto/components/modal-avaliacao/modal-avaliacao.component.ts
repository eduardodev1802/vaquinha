import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjetoService } from '../../domains/service/projeto.service';

@Component({
  selector: 'app-modal-avaliacao',
  templateUrl: './modal-avaliacao.component.html',
  styleUrls: ['./modal-avaliacao.component.scss']
})
export class ModalAvaliacaoComponent implements OnInit {
  public form!: FormGroup;
  token: any;
  viewProjetoAvaliado = false;

  constructor(private authAngular: AngularFireAuth, private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private projetoService: ProjetoService) {
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.authAngular.user.subscribe((user: any) => {
      this.token = user.ya;
    })
  }


  avaliar() {
    this.projetoService.avaliar(this.data.item.id, this.form.value.rating, this.token).subscribe((resp) => {
      
      this.viewProjetoAvaliado = true;

      setTimeout(() => {
        this.matDialog.closeAll();
      }, 2000);
    })
  }
}


