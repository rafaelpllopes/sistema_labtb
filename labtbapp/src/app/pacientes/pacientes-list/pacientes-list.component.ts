import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../pacientes.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

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
  cnsKeyup: boolean = false;
  searchForm: FormGroup;
  isShow: boolean = true;
  meses: any[];
  anos: number[];
  advantecSearch: boolean;

  constructor(
    private service: PacientesService,
    private builder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.service
      .getPacientes(this.currentPage)
      .subscribe(pacientes =>
        this.pacientes = pacientes
      );

    this.searchForm = this.builder.group({
      cns: ['', [Validators.minLength(15), Validators.maxLength(15)]],
      nome: [''],
      sexo: ['']
    });
  }

  load() {
    this.service
      .getPacientes(++this.currentPage)
      .subscribe(pacientes => {
        this.pacientes = this.pacientes.concat(pacientes);
        if (!pacientes.length) this.hasMore = false;
      });
  }

  cnsSearch(cns: number) {
    this.cnsKeyup = true;
    this.searchForm.get('nome').setValue('');
    this.searchForm.get('sexo').setValue('');
    if (cns.toString().length === 0) {
      this.cnsKeyup = false;
    }
  }

  search() {
    const cns = this.searchForm.get('cns').value;
    const nome = this.searchForm.get('nome').value;
    const sexo = this.searchForm.get('sexo').value;

    if (cns || nome || sexo) {
      this.service
        .getPacientesByFilter(cns, nome, sexo)
        .subscribe(pacientes => {
          this.advantecSearch = true;
          this.pacientes = pacientes;
        });
    }
  }

  clear() {

    this.searchForm.get('cns').setValue('');
    this.searchForm.get('nome').setValue('');
    this.searchForm.get('sexo').setValue('');
    //this.searchForm.reset();

    this.currentPage = 1;

    this.service
      .getPacientes(this.currentPage)
      .subscribe(pacientes =>
        this.pacientes = pacientes
      );

    this.advantecSearch = false;

    this.cnsKeyup = false;
  }

  mostrar() {
    this.isShow = !this.isShow;
  }

  delete(id: number) {
    let opc = confirm('Realmente quer excluir o paciente');
    if (opc) {
      if (id) {
        this.service
          .delete(id)
          .subscribe(() => {
            this.alertService.warning('Paciente excluso com sucesso');
            this.pacientes = this.pacientes
              .filter(paciente => paciente.paciente_id !== id);
          }, erro => {
            this.alertService.danger(erro.error);
          })
      }
    }
  }
}
