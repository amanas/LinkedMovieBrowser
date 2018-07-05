import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BrowseComponent} from './browse/browse.component';
import {ReadmeComponent} from './readme/readme.component';

const routes: Routes = [
  {path: 'browse', component: BrowseComponent},
  {path: 'readme', component: ReadmeComponent},
  {path: '**', redirectTo: 'browse', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


