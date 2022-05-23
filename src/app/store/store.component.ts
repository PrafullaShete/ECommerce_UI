
import { StoreModel } from './../Model/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})

export class StoreComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  storeForm: any;

  constructor(public storeservice: StoreService, public router: Router,
    private formBuilder: FormBuilder, private ngxBootstrapConfirmService: NgxBootstrapConfirmService,
    private http: HttpClient, private toastrService: ToastrService, private excelService: ExcelService
  ) { }

  submitted: boolean = false;
  storelist: StoreModel[] = [];
  updated: boolean = false;
  storeobj: StoreModel = new StoreModel();
  selectedFile: any;
  Loading: boolean = false;
  alert: boolean = false;
  alertMsg: any;
  ngOnInit(): void {
    this.GetAllStore();
    this.storeForm = this.formBuilder.group({
      userId: [0],
      storeId: [0],
      name: ['', Validators.required],
      tagLine: ['', Validators.required],
      theme: ['', Validators.required],
      backGroundImage: [''],
      supportsMultipleLang: [false],
      storeRoute: ['', Validators.required],
      createdBy: [''],
      active: [true]
    });
  }

  get f() {
    return this.storeForm.controls;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }



  GetAllStore() {
    this.Loading = true;
    setTimeout(
      () => {
        this.storeservice.getstores().subscribe((data: any) => {
          console.log(data.data);
          this.storelist = data.data;
        })
        this.Loading = false;
      },
      2000
    );
  }
  submitForm() {

    this.submitted = true;

    if (this.storeForm.invalid) {
      return;
    }
    this.storeobj.name = this.storeForm.value.name;
    this.storeobj.tagLine = this.storeForm.value.tagLine;
    this.storeobj.supportsMultipleLang = this.storeForm.value.supportsMultipleLang;
    this.storeobj.theme = this.storeForm.value.theme;
    this.storeobj.backGroundImage = this.storeForm.value.backGroundImage;
    this.storeobj.storeRoute = this.storeForm.value.storeRoute;
    this.storeobj.createdBy = this.storeForm.value.createdBy;

    console.log('on submit', this.storeobj);

    let storeData = new FormData();
    if (this.storeForm.value.storeId == 0 && this.storeForm.value.userId == 1) {
      storeData.append("userId", '1');
      storeData.append("storeId", '0');
    }
    else {
      storeData.append("userId", this.storeobj.userId.toString());
      storeData.append("storeId", this.storeobj.storeId.toString());
    }

    storeData.append("name", this.storeobj.name);
    storeData.append("theme", this.storeobj.theme);
    storeData.append("tagLine", this.storeobj.tagLine);
    storeData.append("storeRoute", this.storeobj.storeRoute);
    storeData.append("backGroundImage", this.storeobj.backGroundImage)
    storeData.append("supportsMultipleLang", this.storeobj.supportsMultipleLang.toString())


    if (this.selectedFile != null && this.selectedFile.length > 0) {
      storeData.append("Files", this.selectedFile[0]);
    }

    if (this.storeobj.storeId == 0) {

      this.storeservice.AddStore(storeData).subscribe((data) => {
        this.GetAllStore();
        this.storeForm.reset();
        this.closebutton.nativeElement.click();
        this.alert = true;
        this.alertMsg = "Store inserted successfully"

      });
    }
    else {

      this.storeservice.UpdateStore(storeData).subscribe(data => {
        this.editStore(this.storeobj);
        this.storeForm.reset();
        this.closebutton.nativeElement.click();
        this.alert = true;
        this.alertMsg = "Store updated successfully"
        this.GetAllStore();

      });
    }
  }

  deleteStore(userId: any) {
    let options = {
      title: 'Sure you want to delete this comment?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }
    this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
      if (res) {
        console.log('Okay');
        this.storeservice.deleteStoreById(userId).subscribe(data => {
          console.log(userId);

          this.GetAllStore();
          this.alert = true;
          this.alertMsg = "Store Deleted successfully"
        })
      }
      else {
        console.log('Cancel');
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.storeForm.reset();
  }

  GetStoreById(storeId: any) {

    this.storeservice.GetStoreById(storeId).subscribe((data: any) => {
      console.log(data.data);
      this.storeobj = data.data;
      this.editStore(this.storeobj);
      console.log(this.storeForm.Value)

    });
  }
  editStore(storeobj: StoreModel) {
    console.log(storeobj)
    this.storeForm.patchValue({
      storeId: storeobj.storeId,
      userId: storeobj.userId,
      name: storeobj.name,
      tagLine: storeobj.tagLine,
      theme: storeobj.theme,
      supportsMultipleLang: storeobj.supportsMultipleLang,
      storeRoute: storeobj.storeRoute,

    });

  }
  onFileselected(event: any) {
    this.selectedFile = event.target.files
    console.log(event);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.storelist, 'Store_Detail');
  }
}


















