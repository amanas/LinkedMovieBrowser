import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class CommunicatorService {

  searchTerm = 'Love';
  @Output() change: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  setSearchTerm(event, v) {
    if (event && event.keyCode === 13) {
      console.log('emiting');
      this.searchTerm = v;
      this.change.emit(this.searchTerm);
    }
  }
}
