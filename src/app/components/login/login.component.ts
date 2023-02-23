import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Formulario reactivo para iniciar sesión
  public loginForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router 
  ) { 
    this.buildFormLogin();
  }

  ngOnInit(): void {
  }

  get correoNoValido() {
    return this.loginForm.get('usuario')?.hasError('required');
  }

  get contraseniaNoValida() {
    return this.loginForm.get('contrasenia')?.hasError('required');
  }

  buildFormLogin()
  {
    this.loginForm = this._formBuilder.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  iniciarSesion() 
  {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }

    Swal.fire({
      icon:'info',
      title: 'Iniciando sesión',
      text: 'Un momento por favor'
    });
    Swal.showLoading();

    setTimeout(() => {
      if (this.loginForm.get('usuario')?.value == 'OPERADOR01' && this.loginForm.get('contrasenia')?.value == '0p3r4d0r2023') {
        Swal.close();
        this._router.navigate(['/mapas']);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: 'Usuario y/o contraseña no válidos',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2054A1',
        });
      }
    }, 700);
    

    
    
  }

}
