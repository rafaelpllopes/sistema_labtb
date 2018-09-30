import { Component, OnInit } from '@angular/core';
import { LaudosService } from '../laudos.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-laudos-adicionar',
  templateUrl: './laudos-adicionar.component.html',
  styleUrls: ['./laudos-adicionar.component.css']
})
export class LaudosAdicionarComponent implements OnInit {

  cnsKeyup: boolean = false;
  paciente: any;
  pacientes: any[];

  constructor(
    private service: LaudosService
  ) { }

  ngOnInit() {}

  digitouCns(cns: number) {
    if(cns) {
      this.cnsKeyup = true;
      if(cns.toString().length === 15){
        this.service
          .getPacienteByCns(cns)
          .subscribe(paciente => this.paciente = paciente, err => {
            console.log(err);
            this.paciente = null;
          });
      }
    } else {
      this.cnsKeyup = false;
      this.paciente = null;
    }
  }

  digitouNome(nome: string) {
    if(nome) {
      this.service
        .getPacienteByName(nome)
        .pipe(debounceTime(1000))
        .subscribe(pacientes => this.pacientes = pacientes);
    }
  }

  pacienteSelect(paciente) {
    this.paciente = paciente;
    this.pacientes = null;
  }

}
