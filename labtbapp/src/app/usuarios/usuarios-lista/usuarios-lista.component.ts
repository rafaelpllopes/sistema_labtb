import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { nomeUsuario } from 'src/app/shared/validators/nome-usuario';

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

  constructor(
    private builder: FormBuilder,
    private activatedRoute: ActivatedRoute
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

  search() {
    console.log(this.searchForm.value);
  }

  clear() {
    this.searchForm.get('nome').setValue('');
    this.searchForm.get('usuario').setValue('');
    this.searchNome = false;
    this.searchUser = false;
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

}
