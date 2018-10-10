import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PacientesService } from '../pacientes.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  selector: 'app-paciente-adicionar',
  templateUrl: './paciente-adicionar.component.html',
  styleUrls: ['./paciente-adicionar.component.css']
})
export class PacienteAdicionarComponent implements OnInit {

  paciente: any;
  id: number;
  formPaciente: FormGroup;

  constructor(
    private service: PacientesService,
    private activatedRoute: ActivatedRoute,
    private formBuild: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.formPaciente = this.formBuild.group({
      cns: ['', [Validators.maxLength(15), Validators.minLength(15)]],
      nome: ['', Validators.required],
      dataNasc: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', Validators.email],
      telefone: [''],
      cep: [''],
      logradouro: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      estado: ['']
    });

    this.id = this.activatedRoute.snapshot.params.id;

    if (this.id) {
      this.service
        .getPacientesById(this.id)
        .subscribe(paciente => {
          this.paciente = paciente;
          this.formPaciente.get('cns').setValue(this.paciente.paciente_cns);
          this.formPaciente.get('nome').setValue(this.paciente.paciente_nome);
          this.formPaciente.get('dataNasc').setValue(this.paciente.paciente_data_nascimento);
          this.formPaciente.get('sexo').setValue(this.paciente.paciente_sexo);
          this.formPaciente.get('email').setValue(this.paciente.paciente_email);
          this.formPaciente.get('telefone').setValue(this.paciente.paciente_telefone);
          this.formPaciente.get('cep').setValue(this.paciente.paciente_cep);
          this.formPaciente.get('logradouro').setValue(this.paciente.paciente_logradouro);
          this.formPaciente.get('numero').setValue(this.paciente.paciente_numero);
          this.formPaciente.get('bairro').setValue(this.paciente.paciente_bairro);
          this.formPaciente.get('cidade').setValue(this.paciente.paciente_municipio);
          this.formPaciente.get('estado').setValue(this.paciente.paciente_estado);
        });
    }
  }

  submit() {

    const paciente = {
      paciente_cns: this.formPaciente.get('cns').value,
      paciente_nome: this.formPaciente.get('nome').value,
      paciente_data_nascimento: this.formPaciente.get('dataNasc').value,
      paciente_sexo: this.formPaciente.get('sexo').value,
      paciente_email: this.formPaciente.get('email').value,
      paciente_telefone: this.formPaciente.get('telefone').value,
      paciente_cep: this.formPaciente.get('cep').value,
      paciente_logradouro: this.formPaciente.get('logradouro').value,
      paciente_numero: this.formPaciente.get('numero').value,
      paciente_bairro: this.formPaciente.get('bairro').value,
      paciente_municipio: this.formPaciente.get('cidade').value,
      paciente_estado: this.formPaciente.get('estado').value
    }

    if (this.id) {
      this.service
        .update(this.id, paciente)
        .subscribe(() => {
          this.router.navigate(['/pacientes']);
          this.alertService.success('Paciente Atualizado com sucesso');
        }, err => {
          console.error(err.message);
          this.alertService.danger('Não foi possivel editar o cadastro do paciente')
        });

    } else {
      this.service
        .add(paciente)
        .subscribe(() => {
          this.router.navigate(['/pacientes']);
          this.alertService.success('Paciente cadastrado com sucesso');
        }, err => {
          console.error(err.message);
          this.alertService.danger('Não foi possivel cadastrar o paciente');
        });
    }
  }

  cepWebService(cep: number) {
    if (cep.toString().length === 8) {
      this.service
        .getCep(cep)
        .subscribe((dados: any) => {
          this.formPaciente.get('cep').setValue(cep);
          this.formPaciente.get('logradouro').setValue(dados.logradouro);
          this.formPaciente.get('bairro').setValue(dados.bairro);
          this.formPaciente.get('cidade').setValue(dados.localidade);
          this.formPaciente.get('estado').setValue(dados.uf);
        });
    }
  }
}
