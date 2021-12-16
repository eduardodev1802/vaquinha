import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  LOCALE_ID,
  ErrorHandler,
} from '@angular/core';
import {
  NgApplicationInsightsModule,
  NgApplicationInsightsErrorHandler,
} from '@wizsolucoes/ng-application-insights';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PrivacyComponent } from './features/privacy/privacy.component';
import { TermsComponent } from './features/terms/terms.component';


const config = {
  apiKey: 'AIzaSyB5RIlZglPp94YSJj2mahammMuymjMyjyc',
  authDomain: 'segundo-mandamento.firebaseapp.com',
  databaseURL: 'https://segundo-mandamento.firebaseio.com',
  projectId: 'segundo-mandamento',
  storageBucket: 'segundo-mandamento.appspot.com',
  messagingSenderId: "951754193636",
  appId: "1:951754193636:web:873de900a2a752b5730af1",
  measurementId: "G-1B8R1NB69Y"
};

registerLocaleData(localePt, 'pt-BR');


@NgModule({
  declarations: [AppComponent, PrivacyComponent, TermsComponent],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    NgApplicationInsightsModule.forRoot({
      enabled: true,
      instrumentationKey: '',
      properties: {},
    }),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: NgApplicationInsightsErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
