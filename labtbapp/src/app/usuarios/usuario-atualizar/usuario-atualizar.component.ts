import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-atualizar',
  templateUrl: './usuario-atualizar.component.html',
  styleUrls: ['./usuario-atualizar.component.css']
})
export class UsuarioAtualizarComponent implements OnInit {
  
  id: number;
  user$: Observable<any>;
  formUser: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: UsuariosService,
    private builder: FormBuilder
  ) { }

  ngOnInit() {

    this.formUser = this.builder.group({
      userPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ]]
    });

    this.id = this.route.snapshot.params.id;

    if(this.id) {
      this.user$ = this.service.getUsuarioById(this.id);
    }
  }

}
