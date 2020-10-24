import { ValidatorFn, AbstractControl } from '@angular/forms';

export const URI_ERROR: string = 'uri';

const URI_REGEX = new RegExp(/^(http|https):\/\/(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])(:[0-9]+)?$/i);

export function uriValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    if (!URI_REGEX.test(control.value)) {
      const error: { [key: string]: any } = {};
      error[URI_ERROR] = true;

      return error;
    }

    return null;
  };
}
