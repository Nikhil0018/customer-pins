import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericDataModel } from '../../models/generic-data.model';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnInit {
  @Input() public formGroup: UntypedFormGroup;
  @Input() public regions: GenericDataModel[] = [];
  @Input() public countries: GenericDataModel[] = [];

  @Output() public onSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  public onCreateCustomerClick(): void {
    this.onSubmit.emit();
  }
}
