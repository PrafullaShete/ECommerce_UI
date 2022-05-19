import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryApiServices } from '../services/categoryapi.services';
import { Model } from '../Model/model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';


@Component({
  selector: 'app-categorycomp',
  templateUrl: './categorycomp.component.html',
  styleUrls: ['./categorycomp.component.scss']
})
export class CategorycompComponent implements OnInit {
  lstmodel: Model[] = [];
  addCategory: any;
  tempId: any = 0;
  activeValue: any;
  @ViewChild('closebutton') closebutton: any;
  storeIdlist: Array<any> = [];
  submitted = false;
  // onchecked = true;
  loading: boolean = false;
  alert: boolean = false;
  alertMsg: any;
  Search: any;
  arry1: any;
  unique: any;

  constructor(private categoryapiservices: categoryApiServices, public router: Router, private formBuilder: FormBuilder,
    private ngxBootstrapConfirmService: NgxBootstrapConfirmService) { }

  ngOnInit() {

    this.GetAllCategory();

    this.addCategory = this.formBuilder.group({
      'id': [0],
      'storeId': [0, [Validators.required]],
      'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'createdBy': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'active': [false],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addCategory.controls;
  }

  onRefreshClick() {
    this.GetAllCategory();
  }

  GetAllCategory() {
    setTimeout(
      () => {
        this.loading = true;
        this.categoryapiservices.GetAllCategory().subscribe((data: any) => {
          console.log(data.data);
          debugger;
          let arr1: number[] = [];
          data.data.forEach((value: any) => {
            console.log(value);
            arr1.push(value.storeId);
          });
          this.unique = [...new Set(arr1)];
          console.log(this.unique);
          this.lstmodel = data.data;
          this.loading = false;
        })
      },
      1000 // the time to sleep to delay for
    );
  }

  InsertNewCategory() {
    debugger; {
      this.submitted = true;
      if (this.addCategory.invalid) {
        return;
      }
      console.log(JSON.stringify(this.addCategory.value, null, 2));
      if (this.addCategory.value.active == true) {
        this.addCategory.controls.active.setValue(1);
      }
      else {
        this.addCategory.controls.active.setValue(0);
      }

      if (this.tempId == 0) {
        debugger;
        this.addCategory.controls.id.setValue(0);
        this.categoryapiservices.InsertNewCategory(this.addCategory.value).subscribe(data => {
          console.log(data);
          this.alert = true;
          this.alertMsg = "Category Inserted Successfully!"
          this.addCategory.reset();
          this.onReset();
          this.GetAllCategory();
        })
      }
      else {
        this.categoryapiservices.UpdateCategoryById(this.addCategory.value).subscribe((data: any) => {
          console.log(data.data);
          this.addCategory.reset();
          this.onReset();
          this.alert = true;
          this.alertMsg = "Category Updated Successfully!"
          this.GetAllCategory();
        })
      }
    }
    this.closebutton.nativeElement.click();
  }

  // DeleteCategoryById(id: any) {
  //   debugger;
  //   this.categoryapiservices.DeleteCategoryById(id).subscribe(data => {
  //     console.log(id);
  //     this.GetAllCategory();
  //   })
  // }

  UpdateCategoryById(category: any) {
    debugger;
    this.addCategory.controls.id.setValue(category.id);
    this.addCategory.controls.storeId.setValue(category.storeId);
    this.addCategory.controls.name.setValue(category.name);
    this.addCategory.controls.createdBy.setValue(category.createdBy);
    if (category.active == 1) {
      this.addCategory.controls.active.setValue(true);
    }
    else {
      this.addCategory.controls.active.setValue(false);
    }
    this.tempId = category.id;
    this.GetAllCategory();
  }

  GetCategoryById(id: any) {
    debugger;
    this.categoryapiservices.GetCategoryById(id).subscribe((data: any) => {
      console.log(this.addCategory)
      console.log("GetCategoryById: ", data.data);
    });
  }

  onReset(): void {
    this.submitted = false;
    this.addCategory.reset();
  }

  DeleteCategoryById(id: any) {
    let options = {
      title: 'Sure you want to delete this Category?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
      if (res) {
        console.log('Yes');
        this.categoryapiservices.DeleteCategoryById(id).subscribe(data => {
          console.log(id);
          this.GetAllCategory();
        })
      }
      else {
        console.log('No');
      }
    });
  }
}

