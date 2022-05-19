import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  readonly APIUrl = "https://localhost:44375/"
  constructor(private http: HttpClient) { }
  headers = {
    headers: new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Accept': 'application/json'
    })
  };

  getstores() {
    return this.http.get<any>(this.APIUrl + `api/Store/GetStores`);
  }
  deleteStoreById(userId: any) {
    return this.http.delete<any>(this.APIUrl + `api/Store/DeleteStore?Id=${userId}`, userId);
  }
  AddStore(val: any) {
    debugger;
    var headers = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        'Accept': 'application/json'
      })
    };
    return this.http.post<any>(this.APIUrl + "api/Store/AddStore", val, headers);

  }
  UpdateStore(val: any) {
    var headers = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        'Accept': 'application/json'
      })
    }
    return this.http.put<any>(this.APIUrl + "api/Store/UpdateStore", val, headers);
  }
  GetStoreById(storeId: any) {
    debugger
    return this.http.get<any>(this.APIUrl + `api/Store/GetStoreById?storeid=+${storeId}`);

  }
}