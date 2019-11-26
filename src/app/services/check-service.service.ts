import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckServiceService {
public baseUrl = "/check";
  constructor(private http: HttpClient) { }

  checkInSubmit(inInfo){
    const url = this.baseUrl + "/in/submit";
    let headers = new HttpHeaders({
      Authorization: `${localStorage.getItem("id_token")}`,
      "Content-Type": "application/json"
    });
    return this.http.post<any>(url,inInfo, { headers: headers });
  }

  checkOutSubmit(outInfo){
    const url = this.baseUrl + "/out/submit";
    let headers = new HttpHeaders({
      Authorization: `${localStorage.getItem("id_token")}`,
      "Content-Type": "application/json"
    });
    return this.http.post(url, outInfo, { headers: headers });
  }
}
