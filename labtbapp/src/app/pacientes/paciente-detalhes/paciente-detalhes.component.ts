import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PacientesService } from '../pacientes.service';

@Component({
  selector: 'app-paciente-detalhes',
  templateUrl: './paciente-detalhes.component.html',
  styleUrls: ['./paciente-detalhes.component.css']
})
export class PacienteDetalhesComponent implements OnInit {

  paciente$: Observable<any>;

  constructor(
    private service: PacientesService,
    private activetedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activetedRoute.snapshot.params.id;
    this.paciente$ = this.service.getPacientesById(id);
  }

}
