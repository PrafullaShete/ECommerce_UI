import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorycompComponent } from './categorycomp/categorycomp.component'

const routes: Routes = [
  {path : '',component : CategorycompComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
