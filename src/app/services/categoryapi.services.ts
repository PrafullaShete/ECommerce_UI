import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient} from "@angular/common/http";
import { Model } from "../Model/model";

@Injectable()
export class categoryApiServices
{
    constructor (private http:HttpClient){}
    GetAllCategory() {
        debugger;
        return this.http.get<Model[]>("https://localhost:44375/GetAllCategory")
    }

    InsertNewCategory(model : any) {
        debugger;
        return this.http.post<any[]>('https://localhost:44375/InsertNewCategory', model)
    }

    DeleteCategoryById(id:Model) : Observable<any> {
        debugger;
        return this.http.delete<Model[]>(`https://localhost:44375/DeleteCategoryById?Id=${id}`)
    }

    GetCategoryById(id:any):Observable<Model[]>{
        debugger;
        return this.http.get<Model[]>(`https://localhost:44375/GetCategoryById?Id=${id}`)
    }

    UpdateCategoryById(model:Model) : Observable<any> {
          debugger;
          return this.http.put<Model[]>('https://localhost:44375/UpdateCategoryById',model)
    }
}