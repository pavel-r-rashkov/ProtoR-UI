import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  Validator,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  Validators,
  FormControl,
} from '@angular/forms';

import { MESSAGES_TOKEN } from '@shared';
import { VALIDATION_MESSAGES } from './messages';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schema-form',
  templateUrl: './schema-form.component.html',
  styleUrls: ['./schema-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SchemaFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SchemaFormComponent,
      multi: true
    },
    {
      provide: MESSAGES_TOKEN,
      useValue: VALIDATION_MESSAGES
    },
  ]
})
export class SchemaFormComponent implements OnDestroy, ControlValueAccessor, Validator {
  form: FormGroup;
  editorOptions: any = {
    language: 'protobuf',
    theme: 'protobuf-theme',
  };
  private onChange: any = () => undefined;
  private onTouched: any = () => undefined;
  private subscriptions: Subscription = new Subscription();

  constructor() {
    this.form = this.buildForm();
    this.trackChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    return this.form.valid ? null : { schemaFrom: 'Invalid form' };
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      contents: new FormControl('', [Validators.required]),
    });
  }

  private trackChanges() {
    const subscription = this.form.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });

    this.subscriptions.add(subscription);
  }
}
