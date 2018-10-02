import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../pacientes.service';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.css']
})
export class PacientesListComponent implements OnInit {

  pacientes: any[];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;

  constructor(
    private service: PacientesService
  ) { }

  ngOnInit() {
    this.service
      .getPacientes(this.currentPage)
      .subscribe(pacientes =>
        this.pacientes = pacientes
      );
  }

  load() {
    this.service
      .getPacientes(++this.currentPage)
      .subscribe(pacientes => {
        this.pacientes = this.pacientes.concat(pacientes);
        if (!pacientes.length) this.hasMore = false;
      });
  }

}
