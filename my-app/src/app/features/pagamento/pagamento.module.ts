import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentoComponent } from './pagamento.component';
import { PagamentoRoutingModule } from './pagamento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from '../login/login-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    PagamentoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QRCodeModule,
    MatCheckboxModule,
    MatSnackBarModule,
    NgxBarcodeModule,
    ReactiveFormsModule,
    PagamentoRoutingModule,
    ClipboardModule,
    MatDialogModule, LoginRoutingModule, SharedModule, MatTabsModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule,
    MatButtonModule
  ]
})
export class PagamentoModule { }
