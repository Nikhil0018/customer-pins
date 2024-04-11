import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
	selector: '[DropZone]'
})
export class DropzoneDirective {
	@Output() onFileDropped = new EventEmitter<any>();

	@HostBinding('style.background') private background = '#FFFFFF';

	@HostListener('dragover', ['$event']) public onDragOver(evt): any {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = '#EEEEEE';
	}

	@HostListener('dragleave', ['$event']) public onDragLeave(evt): any {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = '#FFFFFF';
	}

	@HostListener('drop', ['$event']) public ondrop(evt): any {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = '#FFFFFF';
		const files = evt.dataTransfer.files;
		if (files.length > 0) {
			this.onFileDropped.emit(files);
		}
	}
}
