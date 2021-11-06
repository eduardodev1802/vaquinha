import { SharedModule } from 'src/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ModalCadastroComponent } from './components/modal-cadastro/modal-cadastro.component';
import { ModalMsgComponent } from './components/modal-msg/modal-msg.component';

@NgModule({
  declarations: [LoginComponent, ModalCadastroComponent, ModalMsgComponent],
  imports: [CommonModule, MatDialogModule, LoginRoutingModule, SharedModule, MatTabsModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule { }
