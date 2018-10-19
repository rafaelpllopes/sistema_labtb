import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case-validator';
import { UserNotTakenValidatorService } from './usuario-verifica-exite';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  selector: 'app-usuario-adicionar',
  templateUrl: './usuario-adicionar.component.html',
  styleUrls: ['./usuario-adicionar.component.css']
})
export class UsuarioAdicionarComponent implements OnInit {

  formUser: FormGroup;
  user: any;
  id: number;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private usuarioExiste: UserNotTakenValidatorService,
    private servico: UsuariosService,
    private alerta: AlertService
  ) { }

  ngOnInit() {
    this.formUser = this.builder.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        lowerCaseValidator
      ],
        this.usuarioExiste.checkUserNameTaken()
      ],
      userFullName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      userPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ]]
    });
  }

  submit() {
    const usuario = this.formUser.get('userName').value;
    const nome = this.formUser.get('userFullName').value;
    const senha = this.formUser.get('userPassword').value;

    const user = {
      user_name: usuario,
      user_full_name: nome,
      user_password: senha
    }

    this.servico
      .addUsuario(user)
      .subscribe(() => {
        this.router.navigate(['usuarios']);
        this.alerta.success('Usuário cadastrado com sucesso');
      }, erro => {
        this.alerta.danger('Falha ao cadastrar o usuário');
        console.log(erro);
      });
  }

}
