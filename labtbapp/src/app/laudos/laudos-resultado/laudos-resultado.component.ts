import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LaudosService } from '../laudos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-laudos-resultado',
  templateUrl: './laudos-resultado.component.html',
  styleUrls: ['./laudos-resultado.component.css']
})
export class LaudosResultadoComponent implements OnInit {

  laudo$: Observable<any>;
  id: number;

  constructor(
    private service: LaudosService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.laudo$ = this.service.getLaudoById(this.id);
  }

}
