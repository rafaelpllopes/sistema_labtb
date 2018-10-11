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
    console.log(this.anos);
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
    if (cns.toString().length === 0) {
      this.cnsKeyup = false;
    }
  }

  search() {
    const cns = this.searchForm.get('cns').value;
    const paciente = this.searchForm.get('paciente').value;

    if(cns) {
      console.log(cns);
    } else {
      console.log(paciente);
    }
  }

  clear() {
    this.searchForm.reset();
    this.cnsKeyup = false;
  }

  mostrar() {
    this.isShow = !this.isShow;
  }
}
