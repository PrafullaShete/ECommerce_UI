import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorycompComponent } from './categorycomp/categorycomp.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { categoryApiServices } from './services/categoryapi.services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    CategorycompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    RouterModule,
    ReactiveFormsModule,
    NgxBootstrapConfirmModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [HttpClient,HttpClientModule,categoryApiServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
