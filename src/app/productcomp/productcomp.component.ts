import { Component, OnInit, ViewChild } from '@angular/core';
import { productApiServices } from '../services/productapi.services';
import { Model } from '../Model/prodmodel';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productcomp',
  templateUrl: './productcomp.component.html',
  styleUrls: ['./productcomp.component.css']
})
export class ProductcompComponent implements OnInit {
  lstproduct: any[] = [];
  productObj: Model = new Model();
  insertForm: any;
  @ViewChild('closebutton') closebutton:any;
  tempid:any=0;
  submitted = false;
  Validators: any
  constructor(private productapiservices: productApiServices, public router: Router,
  private formBuilder: FormBuilder,private ngxBootstrapConfirmService: NgxBootstrapConfirmService,private spinner: NgxSpinnerService,public toastr: ToastrService) { }
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  
    this.GetAllProduct();
    this.productObj=new Model();
    this.insertForm = this.formBuilder.group({
      id:[0],
      storeId  : [ ,[Validators.required]],
      categoryId: [ ],
      name:['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      description:['',[Validators.required]],
      showPrice: [false],
      price:[ ,[Validators.required]],
      favNote:[''],
      createdBy:[''],
      active:[false],
      imagePath:['']
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.insertForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;

  }
  onReset(): void {
    this.submitted = false;
    this.insertForm.reset();
  }

  GetAllProduct() {
    debugger;
    this.productapiservices.GetAllProduct().subscribe((value: any) => {
    this.lstproduct = value.data;
      console.log("Get All Product: ",value.data);
    })
  }

  Delete(id: any) {
    debugger;
    let options ={
      title: 'Sure you want to delete this product?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
      if (res) {
        console.log('Yes');
        this.productapiservices.Delete(id).subscribe(data => {
          console.log(id);
          this.GetAllProduct();
         })
      } else {
        console.log('No');
      }
    });    
  }

  InsertProduct() {
    this.submitted = true;
    if (this.insertForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.insertForm.value,null,2));
    if (this.tempid == 0) 
   {
    //  alert('This is Insert.');
    this.productObj.id = this.insertForm.value.id;
    this.productObj.storeId = this.insertForm.value.storeId;
    this.productObj.categoryId = this.insertForm.value.categoryId;
    this.productObj.name = this.insertForm.value.name;
    this.productObj.description = this.insertForm.value.description;
    this.productObj.showPrice = this.insertForm.value.showPrice;
    this.productObj.price = this.insertForm.value.price;
    this.productObj.favNote = this.insertForm.value.favNote;
    this.productObj.createdBy = this.insertForm.value.createdBy;
    this.productObj.active = this.insertForm.value.active;
    this.productObj.imagePath = this.insertForm.value.imagePath;
    this.productapiservices.CreateProduct(this.productObj).subscribe(data => {
    console.log(data);
    this.insertSuccess();
    this.GetAllProduct();
    })}
    else
    {  
      this.productapiservices.UpdateProduct(this.insertForm.value).subscribe(data => {
      console.log(data);
      });
    this.showSuccess();
    this.GetAllProduct();
  }
  // this.GetAllProduct();
  this.closebutton.nativeElement.click();
}
   UpdateProduct(product:any) {
     debugger;
    this.insertForm.controls.id.setValue(product.id);
    this.insertForm.controls.storeId.setValue(product.storeId);
    this.insertForm.controls.categoryId.setValue(product.categoryId);
    this.insertForm.controls.name.setValue(product.name);
    this.insertForm.controls.description.setValue(product.description);
    this.insertForm.controls.showPrice.setValue(product.showPrice);
    this.insertForm.controls.price.setValue(product.price);
    this.insertForm.controls.favNote.setValue(product.favNote);
    this.insertForm.controls.createdBy.setValue(product.createdBy);
    this.insertForm.controls.active.setValue(product.active);
    this.insertForm.controls.imagePath.setValue(product.imagePath);
    this.tempid=product.id;
    this.GetAllProduct();
  }
  public showSuccess(): void {
  debugger;
  this.toastr.success('Update Product Details Successfully', ' Successfull');
  }
  public insertSuccess(): void {
  debugger;
  this.toastr.success('Insert Product Details Successfully', ' Successfull');
  }
  
}


