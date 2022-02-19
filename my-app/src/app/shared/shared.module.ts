import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalLojaComponent } from './components/modal-loja/modal-loja.component';
import { ModalSobreNosComponent } from './components/modal-sobre-nos/modal-sobre-nos.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    NgxMaskModule,
    CurrencyMaskModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ModalLojaComponent,
    ModalSobreNosComponent,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ModalLojaComponent,
    ModalSobreNosComponent
  ],
})
export class SharedModule {}
