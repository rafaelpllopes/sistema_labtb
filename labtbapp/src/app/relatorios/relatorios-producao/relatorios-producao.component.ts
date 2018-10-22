import { mesAno } from './../../shared/validators/mes-ano';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorios-producao',
  templateUrl: './relatorios-producao.component.html',
  styleUrls: ['./relatorios-producao.component.css']
})
export class RelatoriosProducaoComponent implements OnInit {

  producaoForm: FormGroup;

  constructor(
    private build: FormBuilder
  ) { }

  ngOnInit() {
    this.producaoForm = this.build.group({
      ano: [''],
      mes: ['']
    }, {
      validator: mesAno
    });
  }

}
