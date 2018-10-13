import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../pacientes.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
    private builder: FormBuilder
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
    this.searchForm.get('paciente').setValue('');
    if (cns.toString().length === 0) {
      this.cnsKeyup = false;
    }
  }

  search() {
    const cns = this.searchForm.get('cns').value;
    const nome = this.searchForm.get('nome').value;
    const sexo = this.searchForm.get('sexo').value;

    if (cns || nome || sexo) {
      console.log(this.searchForm.value);
    }
  }

  clear() {

    this.searchForm.get('cns').setValue('');
    this.searchForm.get('nome').setValue('');
    this.searchForm.get('sexo').setValue('');

    this.cnsKeyup = false;
  }

  mostrar() {
    this.isShow = !this.isShow;
  }
}
