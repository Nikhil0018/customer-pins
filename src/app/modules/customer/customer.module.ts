import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListingComponent } from './components/customer-listing/customer-listing.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CustomerListingComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
