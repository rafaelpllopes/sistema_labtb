import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { UteisService } from './../../shared/services/uteis.service';

@Component({
  selector: 'app-relatorios-producao',
  templateUrl: './relatorios-producao.component.html',
  styleUrls: ['./relatorios-producao.component.css']
})
export class RelatoriosProducaoComponent implements OnInit {

  producaoForm: FormGroup;
  anos: number[];
  meses: any[];
  producoes$: any[];
  mes: any;
  ano: number;

  constructor(
    private build: FormBuilder,
    private uteis: UteisService
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
    console.log(this.producaoForm.value);
    this.ano = this.producaoForm.get('ano').value;
    this.mes = this.meses.find(mes => mes.numero == this.producaoForm.get('mes').value);
  }

}
