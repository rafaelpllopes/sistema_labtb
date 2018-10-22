import { UsuariosService } from './../usuarios.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { nomeUsuario } from 'src/app/shared/validators/nome-usuario';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {

  users: any[];
  currentPage: number = 1;
  searchForm: FormGroup;
  hasMore: boolean = true;
  isShow: boolean = true;
  searchUser: boolean;
  searchNome: boolean;
  advantecSearch: boolean;

  constructor(
    private builder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: UsuariosService,
    private aviso: AlertService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      data => this.users = data.users
    );

    this.searchForm = this.builder.group({
      nome: [''],
      usuario: ['']
    }, {
        validator: nomeUsuario
      });
  }

  clear() {
    this.searchForm.get('nome').setValue('');
    this.searchForm.get('usuario').setValue('');
    this.searchNome = false;
    this.searchUser = false;
    this.advantecSearch = false;
    this.currentPage = 1;
    this.service
      .getUsuarios(this.currentPage)
      .subscribe(usuarios => this.users = usuarios);
  }

  mostrar() {
    this.isShow = !this.isShow;
  }

  usuarioTouched() {
    this.searchUser = true;
    this.searchForm.get('nome').setValue('');
  }

  nomeTouched() {
    this.searchNome = true;
    this.searchForm.get('usuario').setValue('');
  }

  drop(id: number) {
    let opc = confirm('Realmente quer excluir o usuario');
    if (opc) {
      if (id) {
        this.service
          .deleteUsuario(id)
          .subscribe(() => {
            this.aviso
              .warning('Usuario excluido com sucesso');
            this.users = this.users
              .filter(user => user.user_id != id);
          }, erro => {
            console.log(erro);
            this.aviso.danger(erro.error.msg);
          })
      }
    }
  }

  load() {
    this.service
      .getUsuarios(++this.currentPage)
      .subscribe(usuarios => {
        this.users = this.users.concat(usuarios);
        if (!usuarios.length) this.hasMore = false;
      });
  }

  search() {
    const nome = this.searchForm.get('nome').value;
    const usuario = this.searchForm.get('usuario').value;
    this.service
      .getUsuariosByFilter(nome, usuario)
      .subscribe(usuarios => {
        this.advantecSearch = true;
        this.users = usuarios;
      });

  }

}
