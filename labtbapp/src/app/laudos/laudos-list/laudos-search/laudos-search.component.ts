import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-laudos-search',
  templateUrl: './laudos-search.component.html',
  styleUrls: ['./laudos-search.component.css']
})
export class LaudosSearchComponent implements OnInit, OnDestroy {

  @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();
  @Input() value: string = '';
  debounce: Subject<string> = new Subject<string>();
  
  constructor() { }

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(500))
      .subscribe(filter => this.onTyping.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

}
