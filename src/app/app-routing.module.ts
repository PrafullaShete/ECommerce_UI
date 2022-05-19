import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorycomponentComponent } from './categorycomponent/categorycomponent.component';

import { StoreComponent } from './store/store.component';
const routes: Routes = [
  {path : 'category',component : CategorycomponentComponent},
   {path:'',component:StoreComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
