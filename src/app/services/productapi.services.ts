import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Model } from "../Model/prodmodel";


@Injectable()
export class productApiServices
{

    constructor (private http:HttpClient){}
    
    GetAllProduct() 
    {
        debugger;
        return this.http.get<any[]>("https://localhost:44375/api/Product/GetAllProduct");
    }

    
    Delete(id:Model) : Observable<any>
    {
        debugger;
        return this.http.delete<Model[]>(`https://localhost:44375/api/Product/Delete?Id=${id}`);
    }


    CreateProduct(model:any): Observable<any> 
    {
        debugger;
        return this.http.post<any>('https://localhost:44375/api/Product/CreateProduct', model);       
    }

    UpdateProduct(model:Model):Observable<any> 
    {
        debugger;
        return this.http.put<any>('https://localhost:44375/api/Product/UpdateProduct', model);
    }
   
    
}