import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [SafePipe, TruncatePipe, HomeComponent, CardComponent],
  imports: [SharedModule, HomeRoutingModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatMenuModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule { }
