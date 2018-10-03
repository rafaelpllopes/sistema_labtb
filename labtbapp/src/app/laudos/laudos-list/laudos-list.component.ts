import { Component, OnInit, Input } from '@angular/core';
import { LaudosService } from '../laudos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LaudosList } from './laudos-list';

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

  constructor(
    private laudosService: LaudosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      data => this.laudos = data.laudos
    );
  }

  load() {
    this.laudosService
      .getLaudos(++this.currentPage)
      .subscribe(laudos => {
        this.laudos = this.laudos.concat(laudos);
        if (!laudos.length) this.hasMore = false;
      });
  }
}
