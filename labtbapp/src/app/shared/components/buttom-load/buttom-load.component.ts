import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttom-load',
  templateUrl: './buttom-load.component.html',
  styleUrls: ['./buttom-load.component.css']
})
export class ButtomLoadComponent {

  @Input() hasMore: boolean = false;

  constructor() { }

}
