import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CustomerModel } from 'src/app/modules/shared/models/customer.model';
import { GenericDataModel } from 'src/app/modules/shared/models/generic-data.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss'],
})
export class CustomerListingComponent implements OnInit {
  public customerForm: UntypedFormGroup;
  public pinForm: UntypedFormGroup;
  public regions: GenericDataModel[] = [];
  public countries: GenericDataModel[] = [];

  private unsubscriber$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.initFormListeners();
    this.getRegionsData();
  }

  private initForms(): void {
    this.customerForm = this.formBuilder.group({
      title: new UntypedFormControl(null, [Validators.required]),
      email: new UntypedFormControl(null, [Validators.required]),
      region: new UntypedFormControl(null, [Validators.required]),
      country: new UntypedFormControl(null, [Validators.required]),
    });
  }

  private initFormListeners(): void {
    this.customerForm
      .get('region')
      .valueChanges.pipe(takeUntil(this.unsubscriber$))
      .subscribe((val) => {
        this.resetCountriesData();
        this.getCountriesData();
      });
  }

  private resetCountriesData(): void {
    this.customerForm.get('country').reset();
  }

  private getRegionsData(): void {
    this.sharedService
      .getCountriesData()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((res) => {
        this.setRegionsData(res);
      });
  }

  private setRegionsData(data): void {
    const regionsSet = new Set<string>();
    for (const countryCode in data.data) {
      regionsSet.add(data.data[countryCode].region);
    }

    const regionsArray = Array.from(regionsSet).map((region, index) => ({
      id: index + 1,
      name: region,
    }));
    this.regions = regionsArray;
  }

  private getCountriesData(): void {
    const region = this.customerForm.get('region')?.value?.trim();
    if (!region) {
      return;
    }

    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', region);
    this.sharedService
      .getCountriesData(queryParams)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((res) => {
        this.setCountriesData(res);
      });
  }

  private setCountriesData(data): void {
    const countriesArray = [];
    let id = 1;
    for (const countryCode in data.data) {
      countriesArray.push({
        id: id++,
        name: data.data[countryCode].country,
      });
    }
    this.countries = countriesArray;
  }

  public createCustomer(event): void {
    if(this.customerForm?.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const customer: CustomerModel = this.customerForm.value;
    this.sharedService.storeNewCustomer(customer);
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
