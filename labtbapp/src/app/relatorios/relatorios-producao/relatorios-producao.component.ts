import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { UteisService } from './../../shared/services/uteis.service';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorios-producao',
  templateUrl: './relatorios-producao.component.html',
  styleUrls: ['./relatorios-producao.component.css']
})
export class RelatoriosProducaoComponent implements OnInit {

  producaoForm: FormGroup;
  anos: number[];
  meses: any[];
  producoes$: Observable<any>;
  mes: any;
  ano: number;
  total: any;

  constructor(
    private build: FormBuilder,
    private uteis: UteisService,
    private service: RelatoriosService
  ) { }

  ngOnInit() {
    this.producaoForm = this.build.group({
      ano: ['', Validators.required],
      mes: ['', Validators.required]
    });

    this.anos = this.uteis.getAnos();
    this.meses = this.uteis.getMeses();
  }

  buscar() {
    this.ano = this.producaoForm.get('ano').value;
    let mes = this.producaoForm.get('mes').value;
    this.mes = this.meses.find(mes => mes.numero == this.producaoForm.get('mes').value);
    this.producoes$ = this.service
      .buscaProducao(this.ano, mes);

    this.service
      .totalAnoMes(this.ano, mes)
      .subscribe(total => this.total = total);
  }

}
