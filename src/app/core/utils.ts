import { AbstractControl, ValidatorFn } from "@angular/forms";

export const SUPPORTED_IMAGE_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export function checkIfImage(file: File): boolean {
    const fileType = file.type;
    return SUPPORTED_IMAGE_FILE_TYPES.some(type => {
        return fileType === type;
    });
}

export function firstCharWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control?.value;
      if(!value) return null;

      if (value && value?.length > 0) {
        const firstChar = value.charAt(0);
        if (firstChar === ' ') {
          return { firstCharWhitespace: true };
        }
      }
      return null;
    };
  }