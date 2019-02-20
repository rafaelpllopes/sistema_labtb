import { FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';
import { FormBuilder } from '@angular/forms';
import { UteisService } from 'src/app/shared/services/uteis.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-informe-mensal',
  templateUrl: './informe-mensal.component.html',
  styleUrls: ['./informe-mensal.component.css']
})
export class InformeMensalComponent implements OnInit {

  informeForm: FormGroup;
  anos: number[];
  meses: any[];
  informes$: Observable<any>;
  mes: any;
  ano: number;

  constructor(
    private service: RelatoriosService,
    private build: FormBuilder,
    private uteis: UteisService
  ) { }

  ngOnInit() {
    this.informeForm = this.build.group({
      ano: ['', Validators.required],
      mes: ['', Validators.required]
    });

    this.anos = this.uteis.getAnos();
    this.meses = this.uteis.getMeses();
  }

  buscar() {
    this.ano = this.informeForm.get('ano').value;
    let mes = this.informeForm.get('mes').value;
    this.mes = this.meses.find(mes => mes.numero == this.informeForm.get('mes').value);
    this.informes$ = this.service
      .informeMensal(this.ano, mes);
  }

}
