import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LaudosService } from '../laudos.service';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Laudo } from '../laudo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-laudos-adicionar',
  templateUrl: './laudos-adicionar.component.html',
  styleUrls: ['./laudos-adicionar.component.css']
})
export class LaudosAdicionarComponent implements OnInit {

  //cnsKeyup: boolean = false;
  paciente: any;
  pacientes: any[];
  formLaudo: FormGroup;
  id: number;
  resultados$: Observable<any[]>;
  aspectos$: Observable<any[]>;
  materiais$: Observable<any[]>;
  unidades$: Observable<any[]>;

  constructor(
    private service: LaudosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.formLaudo = this.formBuilder.group({
      paciente: ['', Validators.required],
      numeroGeral: [''],
      material: ['', Validators.required],
      tipo: ['', Validators.required],
      amostras: ['', Validators.required],
      unidade: ['', Validators.required],
      dataColeta: [''],
      obs: [''],
      resultado: [''],
      aspecto: ['']
    });

    this.resultados$ = this.service.getResultados();
    this.aspectos$ = this.service.getAspectos();
    this.materiais$ = this.service.getMateriais();
    this.unidades$ = this.service.getUnidades();
  }

  /*digitouCns(cns: number) {
    if (cns) {
      this.cnsKeyup = true;
      if (cns.toString().length === 15) {
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
  }*/

  digitouNome(nome: string) {
    if (nome) {
      this.service
        .getPacienteByName(nome)
        .pipe(debounceTime(1000))
        .subscribe(pacientes => this.pacientes = pacientes);
    } else {
      this.paciente = null;
      this.id = null;
    }
  }

  pacienteSelect(paciente) {
    this.paciente = paciente;
    this.id = this.paciente.paciente_id;
    this.pacientes = null;
  }

  add() {
    if (this.id && this.paciente) {
      const numeroGeral = this.formLaudo.get('numeroGeral').value;
      const material = this.formLaudo.get('material').value;
      const dataColeta = this.formLaudo.get('dataColeta').value;
      const amostras = this.formLaudo.get('amostras').value;
      const tipo = this.formLaudo.get('tipo').value;
      const unidade = this.formLaudo.get('unidade').value;
      const obs = this.formLaudo.get('obs').value;
      const aspecto = this.formLaudo.get('aspecto').value;
      const resultado = this.formLaudo.get('resultado').value;

      const laudo: any = {
        material_id: material,
        laudo_data_coleta: dataColeta,
        laudo_numero_geral: numeroGeral,
        laudo_amostras: amostras,
        unidade_id: unidade,
        laudo_tipo: tipo,
        laudo_obs: obs,
        aspecto_id: aspecto,
        resultado_id: resultado,
        paciente_id: this.id
      }
      this.service
        .addLaudo(laudo)
        .subscribe(() => {
          this.router.navigate(['laudos']);
          this.alertService.success('Laudo adicionado com sucesso');
        }, err => {
          console.log(err);
          this.alertService.danger('Não foi possivel adicionar o laudo');
        });
    }
  }
}
