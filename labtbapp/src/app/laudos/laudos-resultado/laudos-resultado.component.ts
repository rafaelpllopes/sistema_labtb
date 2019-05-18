import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LaudosService } from '../laudos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  selector: 'app-laudos-resultado',
  templateUrl: './laudos-resultado.component.html',
  styleUrls: ['./laudos-resultado.component.css']
})
export class LaudosResultadoComponent implements OnInit {

  laudo: any;
  resultados: any[];
  aspectos: any[];
  id: number;
  formLaudo: FormGroup;
  materiais$: Observable<any[]>;
  unidades$: Observable<any[]>;

  constructor(
    private service: LaudosService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;


    this.formLaudo = this.formBuilder.group({
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

    this.service
      .getResultados()
      .subscribe(resultados => this.resultados = resultados);
    this.service
      .getAspectos()
      .subscribe(aspectos => this.aspectos = aspectos);

    this.materiais$ = this.service.getMateriais();
    this.unidades$ = this.service.getUnidades();


    this.activeRoute.data.subscribe(
      data => this.laudo = data.laudo
    );

    this.formLaudo.get('numeroGeral').setValue(this.laudo.laudo_numero_geral);
    this.formLaudo.get('material').setValue(this.laudo.material_id);
    this.formLaudo.get('tipo').setValue(this.laudo.laudo_tipo);
    this.formLaudo.get('dataColeta').setValue(this.laudo.laudo_data_coleta);
    this.formLaudo.get('amostras').setValue(this.laudo.laudo_amostras);
    this.formLaudo.get('resultado').setValue(this.laudo.resultado_id);
    this.formLaudo.get('aspecto').setValue(this.laudo.aspecto_id);
    this.formLaudo.get('obs').setValue(this.laudo.laudo_obs);
    this.formLaudo.get('unidade').setValue(this.laudo.unidade_id);
  }

  update() {
    if (this.id) {
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
        laudo_amostras: amostras,
        unidade_id: unidade,
        laudo_tipo: tipo,
        laudo_obs: obs,
        aspecto_id: aspecto,
        resultado_id: resultado
      }

      this.service
        .updateLaudo(this.id, laudo)
        .subscribe(() => {
          this.router.navigate(['laudos']);
          this.alertService.success('Laudo atualizado com sucesso');
        }, error => {
          this.alertService.danger('Não foi possivel editar o laudo');
          console.log(error);
        });
    }
  }

  verificaSelect(id1: number, id2: number) {
    return id1 === id2;
  }
}
