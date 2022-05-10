import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorycomponentComponent } from './categorycomponent/categorycomponent.component';

const routes: Routes = [
  {path : '',component : CategorycomponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
