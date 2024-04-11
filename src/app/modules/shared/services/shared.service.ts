import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiUrl } from 'src/app/services/base-api-url.service';
import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  public storeNewCustomer(customer: CustomerModel): void {
    let customersJSON = localStorage.getItem('customers');
    if (customersJSON) {
      let customers: CustomerModel[] = JSON.parse(customersJSON);
      if (!customers?.length) {
        customers = [];
      }
      customers.push(customer);
      localStorage.setItem('customers', JSON.stringify(customers));
    } else {
      let customers: CustomerModel[] = [];
      customers.push(customer);
      localStorage.setItem('customers', JSON.stringify(customers));
    }
  }

  public getCountriesData(queryParams?: HttpParams): Observable<any> {
    const url = new URL(`${BaseApiUrl.BASE_API}countries`);
    return this.http.get(url.href, { params: queryParams });
  }
}
