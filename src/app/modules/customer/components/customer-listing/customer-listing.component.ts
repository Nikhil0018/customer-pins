import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { firstCharWhitespaceValidator } from 'src/app/core/utils';
import { CustomerModel } from 'src/app/modules/shared/models/customer.model';
import { GenericDataModel } from 'src/app/modules/shared/models/generic-data.model';
import { PinModel } from 'src/app/modules/shared/models/pin.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss'],
})
export class CustomerListingComponent implements OnInit {
  @ViewChild('customerModalTrigger') customerModalTrigger: ElementRef;
  @ViewChild('pinModalTrigger') pinModalTrigger: ElementRef;

  public customerForm: UntypedFormGroup;
  public pinForm: UntypedFormGroup;
  public regions: GenericDataModel[] = [];
  public countries: GenericDataModel[] = [];
  public customers: CustomerModel[] = [];
  public pins: PinModel[] = [];

  private unsubscriber$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.initFormListeners();
    this.getRegionsData();
    this.getCurrentCustomers();
    this.getCurrentPins();
  }

  private initForms(): void {
    this.customerForm = this.formBuilder.group({
      title: new UntypedFormControl(null, [
        Validators.required,
        firstCharWhitespaceValidator(),
      ]),
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      region: new UntypedFormControl(null, [Validators.required]),
      country: new UntypedFormControl(null, [Validators.required]),
    });

    this.pinForm = this.formBuilder.group({
      title: new UntypedFormControl(null, [
        Validators.required,
        firstCharWhitespaceValidator(),
      ]),
      image: new UntypedFormControl(null, [Validators.required]),
      collaboratory: new UntypedFormControl(null, [Validators.required]),
      privacy: new UntypedFormControl(null, [Validators.required]),
    });
  }

  private initFormListeners(): void {
    this.customerForm
      .get('region')
      .valueChanges.pipe(takeUntil(this.unsubscriber$))
      .subscribe((val) => {
        this.resetCountriesValue();
        this.getCountriesData();
      });
  }

  private resetCountriesValue(): void {
    this.customerForm.get('country').patchValue(null);
  }

  private getRegionsData(): void {
    this.sharedService
      .getCountriesData()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((res) => {
        this.setRegionsData(res);
      });
  }

  public getCurrentCustomers(): void {
    this.customers = this.sharedService.getCurrentCustomers();
  }

  public getCurrentPins(): void {
    this.pins = this.sharedService.getCurrentPins();
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
    if (this.customerForm?.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const customer: CustomerModel = this.customerForm.value;
    this.sharedService.storeNewCustomer(customer);
    this.getCurrentCustomers();
    this.dismissCustomerModal();
    this.customerForm.reset();
  }

  public dismissCustomerModal(): void {
    const modalElement: HTMLElement = this.customerModalTrigger.nativeElement;
    if (modalElement) {
      modalElement.click();
    }
  }

  public dismissPinModal(): void {
    const modalElement: HTMLElement = this.pinModalTrigger.nativeElement;
    if (modalElement) {
      modalElement.click();
    }
  }

  public createPin(event): void {
    if (this.pinForm?.invalid) {
      this.pinForm.markAllAsTouched();
      return;
    }

    const pin: PinModel = this.pinForm.value;

    this.sharedService
      .storeNewPin(pin)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(
        (res) => {
          this.handlePinResponse();
        },
        (err) => {
          this.handlePinResponse();
        }
      );
  }

  public handlePinResponse(): void {
    this.getCurrentPins();
    this.dismissPinModal();
    this.pinForm.reset();
  }

  public getCustomerNameFromId(customerId: number): string {
    return this.customers.find((customer) => customer.id == customerId).title;
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
