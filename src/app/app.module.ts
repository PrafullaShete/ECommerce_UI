import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorycomponentComponent } from './categorycomponent/categorycomponent.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { categoryApiServices } from './services/categoryapi.services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CategorycomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    RouterModule
  ],
  providers: [HttpClient,HttpClientModule,categoryApiServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
