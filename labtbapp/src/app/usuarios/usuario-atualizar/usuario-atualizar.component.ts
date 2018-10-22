import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  selector: 'app-usuario-atualizar',
  templateUrl: './usuario-atualizar.component.html',
  styleUrls: ['./usuario-atualizar.component.css']
})
export class UsuarioAtualizarComponent implements OnInit {

  id: number;
  formUser: FormGroup;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UsuariosService,
    private builder: FormBuilder,
    private aviso: AlertService
  ) { }

  ngOnInit() {

    this.formUser = this.builder.group({
      userPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern('[A-Za-z0-9!@#$%&*()-+?]*')
      ]],
      userFullName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]]
    });

    this.id = this.route.snapshot.params.id;

    if (this.id) {
      this.service
        .getUsuarioById(this.id)
        .subscribe(user => {
          this.user = user;
          this.formUser.get('userFullName').setValue(this.user.user_full_name);
        });
    }
  }

  submit() {
    if (this.formUser.value) {
      const nome = this.formUser.get('userFullName').value;
      const senha = this.formUser.get('userPassword').value;

      this.service
        .updateUsuario(this.id, {
          user_full_name: nome,
          user_password: senha
        })
        .subscribe(() => {
          this.router.navigate(['usuarios']);
          this.aviso.success('Usuario editar com sucesso');
        }, erro => {
          console.log(erro);
          this.aviso.danger('Falha ao editar o usuario')
        });
    } else {
      this.aviso.warning('Campos obrigatorios devem ser preenchidos');
    }
  }

}
