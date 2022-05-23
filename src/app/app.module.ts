import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorycomponentComponent } from './categorycomponent/categorycomponent.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { categoryApiServices } from './services/categoryapi.services';
import { productApiServices } from './services/productapi.services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ProductcompComponent } from './productcomp/productcomp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import {ToastrModule} from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TableModule } from 'primeng/table';
import { ExcelService } from './services/prodExel.service';


@NgModule({
  declarations: [
    AppComponent,
    CategorycomponentComponent,
    ProductcompComponent
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
    NgxBootstrapConfirmModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 5 seconds
      progressBar: true,
    }),
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    TableModule,
  ],
  providers: [HttpClient,HttpClientModule,categoryApiServices,productApiServices,ExcelService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
