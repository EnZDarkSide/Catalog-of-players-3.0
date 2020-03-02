import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDateAdapter } from './models/momentDP';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FetchDataComponent,
    AddPlayerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: FetchDataComponent },
      { path: 'add-player', component: AddPlayerComponent },
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
