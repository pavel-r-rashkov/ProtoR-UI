import { Injectable } from "@angular/core";
import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class ValidatorProxy implements Validator {
  validator?: Validator;

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.validator) {
      return this.validator.validate(control);
    }

    return null;
  }
}
