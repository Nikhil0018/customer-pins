import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CustomerModel } from '../../models/customer.model';
import { BaseApiUrl } from 'src/app/services/base-api-url.service';
import { Subject, takeUntil } from 'rxjs';
import { checkIfImage } from 'src/app/core/utils';

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.scss'],
})
export class CreatePinComponent implements OnInit {
	@ViewChild('fileSelect') fileSelect: ElementRef;
  @Input() public formGroup: UntypedFormGroup;
  @Input() public customers: CustomerModel[] = [];

  @Output() public onSubmit: EventEmitter<void> = new EventEmitter<void>();

  public hasBaseDropZoneOver: boolean = false;
  public uploadMoreCount: number = 0;

  private unsubscriber$: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
  }

  public fileOverBase(flag: boolean): void {
    this.hasBaseDropZoneOver = flag;
  }

  public onCreateCustomerClick(): void {
    this.onSubmit.emit();
  }

  // ! File Select Implementation
  public openAddFilesDialog() {
		const e = this.fileSelect.nativeElement;
		e.addEventListener('change', this.onFileEleChange.bind(this));
		this.uploadMoreCount = 0;
		e.click();
	}

	public onFileEleChange(event: any): void {
		if (this.uploadMoreCount == 1) {
			return;
		}
		this.uploadMoreCount = 1;
		const file = event.target.files[0];

    if(!checkIfImage(file)){
      alert('Wrong file type! Please select a .jpg or .png image');
      return;
    }

    this.formGroup.get('image').patchValue(file);
	}

  public getDroppedFiles(files): void {
		let selectedImage: File = files[0];
    
    if(!checkIfImage(selectedImage)){
      alert('Wrong file type! Please select a .jpg or .png image');
      return;
    }
    
    this.formGroup.get('image').patchValue(files[0]);
	}

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
