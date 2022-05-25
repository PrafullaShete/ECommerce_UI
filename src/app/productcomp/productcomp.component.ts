import { Component, OnInit, ViewChild } from '@angular/core';
import { productApiServices } from '../services/productapi.services';
import { Model } from '../Model/prodmodel';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/prodExel.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-productcomp',
  templateUrl: './productcomp.component.html',
  styleUrls: ['./productcomp.component.css']
})
export class ProductcompComponent implements OnInit {
  listproduct: any[] = [];
  productObj: Model = new Model();
  insertForm: any;
  showModal: boolean = false;
  @ViewChild('closebutton') closebutton: any;
  tempid: any = 0;
  submitted = false;
  Validators: any;
  msgs: Message[] = [];


  constructor(private productapiservices: productApiServices, public router: Router,
    private formBuilder: FormBuilder, private ngxBootstrapConfirmService: NgxBootstrapConfirmService,
    private spinner: NgxSpinnerService, public toastr: ToastrService, private excelService: ExcelService, private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) { }
  ngOnInit(): void {
    this.GetAllProduct();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.primengConfig.ripple = true;
    this.productObj = new Model();
    this.insertForm = this.formBuilder.group({
      id: [0],
      storeId: [, [Validators.required]],
      categoryId: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', [Validators.required]],
      showPrice: [false],
      price: [, [Validators.required]],
      favNote: [''],
      createdBy: [''],
      active: [false],
      imagePath: ['']
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.insertForm.controls;
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }

  onSubmit(): void {
    this.submitted = true;

  }
  onReset(): void {
    this.submitted = false;
    this.insertForm.reset();
    this.tempid = 0;
  }

  GetAllProduct() {
    debugger;
    this.productapiservices.GetAllProduct().subscribe((value: any) => {
      this.listproduct = value.data;
      console.log("Get All Product: ", value.data);
    })
  }

  Delete(id: any) {
    debugger;
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productapiservices.Delete(id).subscribe(data => {
          console.log(id);
          this.GetAllProduct();
          this.DeleteSuccess();
        })
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
    this.GetAllProduct();
  }


  InsertProduct() {
    debugger;
    this.submitted = true;
    if (this.insertForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.insertForm.value, null, 2));
    debugger;
    if (this.tempid == 0 || this.tempid == null) {
      this.productObj.id = 0;
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
        this.GetAllProduct();
        this.insertSuccess();

      })
    }
    else {
      this.productapiservices.UpdateProduct(this.insertForm.value).subscribe(data => {
        console.log(data);
        this.GetAllProduct();
      });
      this.showSuccess();
      this.tempid = 0;
    }

    this.closebutton.nativeElement.click();
  }

  UpdateProduct(product: any) {
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
    this.tempid = product.id;
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
  public DeleteSuccess(): void {
    debugger;
    this.toastr.success('Delete Product Details Successfully', ' Deleted');
  }
  exportAsXLSX(): void {
    debugger;
    this.excelService.exportAsExcelFile(this.listproduct, 'sample');
  }
}


