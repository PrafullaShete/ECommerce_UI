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
import { StoreComponent } from './store/store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';


@NgModule({
  declarations: [
    AppComponent,
    CategorycomponentComponent,
    StoreComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxBootstrapConfirmModule 
  ],
  providers: [HttpClient,HttpClientModule,categoryApiServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
