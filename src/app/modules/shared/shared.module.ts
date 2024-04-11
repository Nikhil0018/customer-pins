import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/services/error.interceptor';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CreatePinComponent } from './components/create-pin/create-pin.component';
import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
  declarations: [
    CreateCustomerComponent,
    CreatePinComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CreateCustomerComponent,
    CreatePinComponent,
    NgxSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
