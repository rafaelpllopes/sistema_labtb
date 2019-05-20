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
  laudos$: Observable<any>;
  total: number;

  constructor(
    private service: RelatoriosService,
    private build: FormBuilder,
    private uteis: UteisService,
  ) { }

  ngOnInit() {
    this.laudosPeriodo = this.build.group({
      dataInicial: ['', Validators.required],
      dataFinal: ['', Validators.required]
    });
  }

  buscar() {
    const dataInicial = this.laudosPeriodo.get('dataInicial').value;
    const dataFinal = this.laudosPeriodo.get('dataFinal').value;
    this.laudos$ = this.service
      .laudosPorPeriodo(dataInicial, dataFinal);
    this.laudos$.subscribe(laudos => this.total = laudos.length);
  }

  print() {
    window.print();
  }

}
