import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MarkdownModule} from 'ngx-markdown';

import {ImdbService} from './imdb.service';

import {AppRoutingModule} from './app.routing.module';

import {AppComponent} from './app.component';
import {BrowseComponent} from './browse/browse.component';
import {ReadmeComponent} from './readme/readme.component';
import {CommunicatorService} from './communicator.service';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule.forRoot(),
    MarkdownModule.forRoot()
  ],
  declarations: [
    AppComponent,
    BrowseComponent,
    ReadmeComponent],
  bootstrap: [AppComponent],
  providers: [ImdbService, CommunicatorService]
})

export class AppModule {
}
