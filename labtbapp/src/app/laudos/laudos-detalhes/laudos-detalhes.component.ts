import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { LaudosService } from './../laudos.service';

@Component({
  selector: 'app-laudos-detalhes',
  templateUrl: './laudos-detalhes.component.html',
  styleUrls: ['./laudos-detalhes.component.css']
})
export class LaudosDetalhesComponent implements OnInit {

  laudo$: Observable<any>;
  id: number;
  dataSaida: string;

  constructor(
    private service: LaudosService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.laudo$ = this.service.getLaudoById(this.id);
  }

  print() {
    let data = new Date();
    this.dataSaida = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    window.print();
  }

}
