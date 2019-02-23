import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

    const [currentMonth] = this.meses.filter(mes => parseInt(mes.numero) == new Date().getMonth() + 1);

    this.producaoForm.get('ano').setValue(new Date().getFullYear());
    this.producaoForm.get('mes').setValue(currentMonth.numero);
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

  downloadPDF() {
    let data = document.getElementById('pdf'); 
    html2canvas(data)
      .then(canvas => {
        let imgWidth = 203;
        let pageHeight = 290;
        let imgHeight = canvas.height * imgWidth/canvas.width;
        let heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        let position = 10;
        pdf.addImage(contentDataURL, 'PNG', 3, position, imgWidth, imgHeight);
        pdf.save(`procução_${this.producaoForm.get('mes').value}-${this.ano}.pdf`);
      });
  }

  dataHora() {
    return new Date();
  }

}
