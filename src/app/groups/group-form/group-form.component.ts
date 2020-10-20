import { Component, OnDestroy } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  FormGroup,
  ControlValueAccessor,
  FormControl,
  Validator,
  AbstractControl,
  ValidationErrors,
  Validators,
  NG_VALIDATORS,
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { MESSAGES_TOKEN } from '@shared';
import { VALIDATION_MESSAGES } from './messages';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GroupFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: GroupFormComponent,
      multi: true
    },
    {
      provide: MESSAGES_TOKEN,
      useValue: VALIDATION_MESSAGES
    },
  ],
})
export class GroupFormComponent implements OnDestroy, ControlValueAccessor, Validator {
  form: FormGroup;
  private onChange: any = () => undefined;
  private onTouched: any = () => undefined;
  private subscription: Subscription = new Subscription();

  constructor() {
    this.form = this.buildForm();
    this.trackChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  writeValue(obj: any): void {
    this.form.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { groupFrom: 'Invalid form' };
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    });
  }

  private trackChanges() {
    const subscription = this.form.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });

    this.subscription.add(subscription);
  }
}
