import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {CommunicatorService} from './communicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public router: Router, private communicatorService: CommunicatorService) {
  }

  ngOnInit() {
  }

  searchTerm(event, v) {
    console.log('findMovies');
    this.communicatorService.setSearchTerm(event, v);
  }

  goBrowse() {
    console.log('browse');
    this.router.navigate(['/browse'], {
      skipLocationChange: false
    });
  }

  goReadme() {
    console.log('readme');
    this.router.navigate(['/readme'], {
      skipLocationChange: false
    });
  }
}
