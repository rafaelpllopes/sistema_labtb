import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load-list-buttom',
  templateUrl: './load-list-buttom.component.html',
  styleUrls: ['./load-list-buttom.component.css']
})
export class LoadListButtomComponent {
  
  @Input() hasMore: boolean = false;
  
  constructor() { }
}
