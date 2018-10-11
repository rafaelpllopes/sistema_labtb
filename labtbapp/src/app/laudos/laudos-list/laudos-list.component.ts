import { Component, OnInit, Input } from '@angular/core';
import { LaudosService } from '../laudos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LaudosList } from './laudos-list';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UteisService } from 'src/app/shared/services/uteis.service';

@Component({
  selector: 'app-laudos-list',
  templateUrl: './laudos-list.component.html',
  styleUrls: ['./laudos-list.component.css']
})
export class LaudosListComponent implements OnInit {

  laudos: LaudosList[] = [];
  filter: string = '';
  currentPage: number = 1;
  hasMore: boolean = true;
  cnsKeyup: boolean = false;
  searchForm: FormGroup;
  isShow: boolean = true;
  meses: any[];
  anos: number[];
  advantecSearch: boolean;

  constructor(
    private laudosService: LaudosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private serviceUteis: UteisService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      data => this.laudos = data.laudos
    );

    this.searchForm = this.builder.group({
      cns: ['', [Validators.minLength(15), Validators.maxLength(15)]],
      paciente: [''],
      mes: [''],
      ano: ['']
    });

    this.meses = this.serviceUteis.getMeses();
    this.anos = this.serviceUteis.getAnos();
  }

  load() {
    this.laudosService
      .getLaudos(++this.currentPage)
      .subscribe(laudos => {
        this.laudos = this.laudos.concat(laudos);
        if (!laudos.length) this.hasMore = false;
      });
  }

  cnsSearch(cns: number) {
    this.cnsKeyup = true;
    this.searchForm.get('paciente').setValue('');
    if (cns.toString().length === 0) {
      this.cnsKeyup = false;
    }
  }

  search() {
    const cns = this.searchForm.get('cns').value;
    const paciente = this.searchForm.get('paciente').value;
    const mes = this.searchForm.get('mes').value;
    const ano = this.searchForm.get('ano').value;

    if (cns || paciente || mes && ano) {
      this.laudosService
        .filterLaudos(cns, paciente, mes, ano)
        .subscribe(laudos => {
          this.advantecSearch = true;
          this.laudos = laudos;
        });
    }
  }

  clear() {

    this.searchForm.get('cns').setValue('');
    this.searchForm.get('paciente').setValue('');
    this.searchForm.get('mes').setValue('');
    this.searchForm.get('ano').setValue('');

    this.cnsKeyup = false;

    this.laudosService
      .getLaudos(1)
      .subscribe(laudos => {
        this.laudos = laudos;
        this.hasMore = true;
        this.advantecSearch = false;
      });
  }

  mostrar() {
    this.isShow = !this.isShow;
  }
}
