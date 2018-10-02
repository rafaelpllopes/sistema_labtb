import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LaudosService } from '../laudos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-laudos-resultado',
  templateUrl: './laudos-resultado.component.html',
  styleUrls: ['./laudos-resultado.component.css']
})
export class LaudosResultadoComponent implements OnInit {

  laudo$: Observable<any>;
  resultados: any[];
  aspectos: any[];
  id: number;
  formLaudo: FormGroup;

  constructor(
    private service: LaudosService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.laudo$ = this.service.getLaudoById(this.id);     

    this.service
      .getResultados()
      .subscribe(resultados => this.resultados = resultados);
    this.service
      .getAspectos()
      .subscribe(aspectos => this.aspectos = aspectos);

    this.formLaudo = this.formBuilder.group({
      material: [''],
      dataColeta: [''],
      diagnostico: [''],
      controle: [''],
      resultado: [''],
      aspecto: [''],
      obs: ['']
    });
  }

  update() {
    if (this.id) {
      const material = this.formLaudo.get('material').value;
      const dataColeta = this.formLaudo.get('dataColeta').value;
      const diagnostico = this.formLaudo.get('diagnostico').value;
      const controle = this.formLaudo.get('controle').value;
      const resultado = this.formLaudo.get('resultado').value;
      const aspecto = this.formLaudo.get('aspecto').value;
      const obs = this.formLaudo.get('obs').value;

      const laudo = {
        laudo_material: material,
        laudo_data_coleta: dataColeta,
        laudo_amostras: diagnostico,
        laudo_controle: controle,
        laudo_obs: obs,
        aspecto_id: aspecto,
        resultado_id: resultado
      }

      this.service
        .updateLaudo(this.id, laudo)
        .subscribe(() => {
          this.router.navigate(['laudos']);
        }, error => {
          console.log(error);
        });
    }
  }

  verificaSelect(id1: number, id2: number) {
    return id1 === id2;
  }
}
