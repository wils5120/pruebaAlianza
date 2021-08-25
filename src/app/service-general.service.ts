import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {


  private url = 'http://localhost:8080/api/'
  constructor(private http: HttpClient) { }

  getData(): Observable<any>{
    return this.http.get(this.url + 'getdata')
  }

  submitData(body: any){
    return this.http.post(this.url + 'postdata', body);
  }

  getDataKey(key: String){
    return this.http.get(this.url + 'getdata/' + key)
  }
}
