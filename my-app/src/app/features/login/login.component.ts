import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  formCadastro!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private authAngular: AngularFireAuth,
    private router: Router,
  ) {
    this.authAngular.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.router.navigate(['/']);
        return true;
      } else {
        this.router.navigate(['/login']);
        console.log('user is not logged in');
        return false;
      }
    });
  }

  ngOnInit() {
    this.inicializarFormularioLogin();
    this.inicializarFormularioCadastro();
  }

  inicializarFormularioLogin() {
    this.formLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required]),
    });
  }

  inicializarFormularioCadastro() {
    this.formCadastro = this.fb.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      data: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.formLogin.controls[controlName].hasError(errorName);
  };

  public checkErrorCadastro = (controlName: string, errorName: string) => {
    return this.formCadastro.controls[controlName].hasError(errorName);
  };

  fazerLogin() {
    this.authService.login(this.formLogin.value.email, this.formLogin.value.password);
  }

  fazerLoginGoogle() {
    this.authService.GoogleAuth();
  }

  fazerLoginFacebook() {
    this.authService.FacebookAuth();
  }
}
