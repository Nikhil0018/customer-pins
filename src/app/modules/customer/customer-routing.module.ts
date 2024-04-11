import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListingComponent } from './components/customer-listing/customer-listing.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
