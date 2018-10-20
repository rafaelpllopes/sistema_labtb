import { AlertService } from './../../shared/components/alert/alert.service';
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

  constructor(
    private service: LaudosService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.laudo$ = this.service.getLaudoById(this.id);
  }

  print() {
    window.print();
  }

  delete(id) {
    let opc = confirm('Realmente quer excluir o laudo?');
    if (opc) {
      this.service
        .deleteLaudo(id)
        .subscribe(() => {
          this.router.navigate(['laudos']);
          this.alertService.warning('Laudo deletado com sucesso');
        }, err => {
          this.alertService.danger('Não foi possivel deletar o laudo');
          console.log(err);
        });
    }
  }

}
