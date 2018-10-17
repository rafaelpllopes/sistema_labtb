import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-detalhes',
  templateUrl: './usuario-detalhes.component.html',
  styleUrls: ['./usuario-detalhes.component.css']
})
export class UsuarioDetalhesComponent implements OnInit {

  user$: Observable<any>;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private service: UsuariosService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if(this.id) {
      this.user$ = this.service.getUsuarioById(this.id);
    }
  }

}
