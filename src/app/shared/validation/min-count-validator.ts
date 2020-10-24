import { ValidatorFn, AbstractControl } from '@angular/forms';

export const MIN_COUNT_ERROR: string = 'minCount';

export function minCountValidator(count: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const currentLength = (control.value || []).length;

    if (currentLength < count) {
      const error: { [key: string]: any } = {};
      error[MIN_COUNT_ERROR] = {
        currentLength,
        minLength: count,
      };

      return error;
    }

    return null;
  };
}
