import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RelatoriosService } from '../relatorios.service';
import { UteisService } from 'src/app/shared/services/uteis.service';

@Component({
  selector: 'app-laudos-periodo',
  templateUrl: './laudos-periodo.component.html',
  styleUrls: ['./laudos-periodo.component.css']
})
export class LaudosPeriodoComponent implements OnInit {

  laudosPeriodo: FormGroup;
  anos: number[];
  meses: any[];
  laudos$: Observable<any>;
  mes: any;
  ano: number;
  total: number;

  constructor(
    private service: RelatoriosService,
    private build: FormBuilder,
    private uteis: UteisService,
  ) { }

  ngOnInit() {
    this.laudosPeriodo = this.build.group({
      ano: ['', Validators.required],
      mes: ['', Validators.required]
    });

    this.anos = this.uteis.getAnos();
    this.meses = this.uteis.getMeses();

    const [currentMonth] = this.meses.filter(mes => parseInt(mes.numero) == new Date().getMonth() + 1);

    this.laudosPeriodo.get('ano').setValue(new Date().getFullYear());
    this.laudosPeriodo.get('mes').setValue(currentMonth.numero);
  }

  buscar() {
    this.ano = this.laudosPeriodo.get('ano').value;
    const mes = this.laudosPeriodo.get('mes').value;
    this.mes = this.meses.find(mes => mes.numero == this.laudosPeriodo.get('mes').value);
    this.laudos$ = this.service
      .laudosPorPeriodo(mes, this.ano);
    this.laudos$.subscribe(laudos => this.total = laudos.length);
  }

  print() {
    window.print();
  }

}
