import { Component, OnInit } from '@angular/core';
import { categoryApiServices } from '../services/categoryapi.services';
import { Model } from '../Model/model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categorycomponent',
  templateUrl: './categorycomponent.component.html',
  styleUrls: ['./categorycomponent.component.css']
})
export class CategorycomponentComponent implements OnInit {
  lstmodel: any[] = [];

  constructor(private categoryapiservices: categoryApiServices, public router: Router) {
  }
  
  ngOnInit() {
    this.GetAllCategory();
  }

    // this.categoryapiservices.getmodelbyparameter().subscribe((data: any) => {
    //   this.lstmodel = data.data;
    //   console.log(data.data);
    // });
    GetAllCategory(){
    this.categoryapiservices.GetAllCategory().subscribe((data:any)=>{
      console.log(data.data);
      this.lstmodel = data.data;
    })
  }

}
