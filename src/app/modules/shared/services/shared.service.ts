import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, map, Observable, of, take } from 'rxjs';
import { BaseApiUrl } from 'src/app/services/base-api-url.service';
import { CustomerModel } from '../models/customer.model';
import { PinModel } from '../models/pin.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  public storeNewCustomer(customer: CustomerModel): void {
    let customers: CustomerModel[] = this.getCurrentCustomers();
    customer.id = customers.length + 1;
    customers.push(customer);
    localStorage.setItem('customers', JSON.stringify(customers));
  }

  public getCurrentCustomers(): CustomerModel[] {
    let customersJSON = localStorage.getItem('customers');
    if (customersJSON) {
      let customers: CustomerModel[] = JSON.parse(customersJSON);
      if (!customers?.length) {
        customers = [];
      }
      return customers;
    }
    return [];
  }

  public storeNewPin(pin: PinModel): Observable<boolean> {
    let pins: PinModel[] = this.getCurrentPins();
    pin.id = pins.length + 1;

    const formData: FormData = new FormData();
    formData.append('image', pin.image);
    formData.append('name', 'pin_image_' + pin.id);

    return this.uploadImageToIBB(formData)
      .pipe(
        take(1),
        map((imgUrl) => {
          pin.image = imgUrl?.data?.url;
          pins.push(pin);
          localStorage.setItem('pins', JSON.stringify(pins));
          return true;
        }),
        catchError(error => {
          // * If there's an error uploading the image, emit a mock image URL
          const imageUrl = 'assets/icons/mock-img.svg';
          pin.image = imageUrl;
          pins.push(pin);
          localStorage.setItem('pins', JSON.stringify(pins));
          return of(false);
        })
      );
  }

  public getCurrentPins(): PinModel[] {
    let pinsJSON = localStorage.getItem('pins');
    if (pinsJSON) {
      let pins: PinModel[] = JSON.parse(pinsJSON);
      if (!pins?.length) {
        pins = [];
      }
      return pins;
    }
    return [];
  }

  public uploadImageToIBB(formData: FormData): Observable<any> {
    const url = new URL(
      `https://api.imgbb.com/1/upload?expiration=600&key=${BaseApiUrl.IMGBB_API_KEY}`
    );
    return this.http.post(url.href, formData);
  }

  public getCountriesData(queryParams?: HttpParams): Observable<any> {
    const url = new URL(`${BaseApiUrl.BASE_API}countries`);
    return this.http.get(url.href, { params: queryParams });
  }
}
