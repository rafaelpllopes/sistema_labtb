import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case-validator';
import { UserNotTakenValidatorService } from './usuario-verifica-exite';

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
    private usuarioExiste: UserNotTakenValidatorService,
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
    console.log(this.formUser.value);
  }

}
