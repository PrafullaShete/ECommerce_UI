import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Model } from "../Model/model";


@Injectable()
export class categoryApiServices
{

    constructor (private http:HttpClient){}
    // getmodelbyparameter():Observable<any> {
    //     let params1 = new HttpParams().set('Id',"5")
    //     return this.httpclient.get("https://localhost:44375/GetCategoryById",{params : params1});
    // }
    
    GetAllCategory() {
        return this.http.get<any[]>("https://localhost:44375/GetAllCategory")
    }

}