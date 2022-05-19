import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorycomponentComponent } from './categorycomponent/categorycomponent.component';
import { ProductcompComponent } from './productcomp/productcomp.component';
const routes: Routes = [
  {path : 'categorycomponent',component : CategorycomponentComponent},
  {path : '',component : ProductcompComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
