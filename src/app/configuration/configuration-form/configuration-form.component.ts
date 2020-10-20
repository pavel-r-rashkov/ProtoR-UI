import { Component, OnDestroy, Input, OnChanges } from '@angular/core';
import {
  ControlValueAccessor,
  Validator,
  FormGroup,
  ValidationErrors,
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  FormControl,
  FormArray,
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { MESSAGES_TOKEN } from '@shared';
import { ConfigurationForm } from './configuration-form';
import { VALIDATION_MESSAGES } from './messages';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ConfigurationFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ConfigurationFormComponent,
      multi: true,
    },
    {
      provide: MESSAGES_TOKEN,
      useValue: VALIDATION_MESSAGES,
    },
  ],
})
export class ConfigurationFormComponent implements OnChanges, OnDestroy, ControlValueAccessor, Validator {
  @Input() inheritsFrom?: ConfigurationForm;
  form: FormGroup;
  private cachedForm?: ConfigurationForm;
  private onChange: any = () => undefined;
  private onTouched: any = () => undefined;
  private subscriptions: Subscription = new Subscription();

  constructor() {
    this.form = this.buildForm();
    this.trackInherit();
    this.trackChanges();
  }

  get rulesForm(): FormArray {
    return this.form.controls.ruleConfigurations as FormArray;
  }

  ngOnChanges() {
    if (this.form.value.inherit) {
      this.form.patchValue({
        transitive: this.inheritsFrom?.transitive,
        backwardCompatible: this.inheritsFrom?.backwardCompatible,
        forwardCompatible: this.inheritsFrom?.forwardCompatible,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  writeValue(obj: ConfigurationForm): void {
    if (!obj) {
      return;
    }

    this.cachedForm = obj;
    this.rulesForm.controls.splice(0, this.rulesForm.controls.length);

    if (obj) {
      for (const _ of obj.ruleConfigurations) {
        this.rulesForm.controls.push(new FormControl());
      }
    }

    this.form.patchValue(obj || {}, { emitEvent: false });
    this.processInheritChanged(obj.inherit);
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
    return this.form.valid ? null : { configurationFrom: 'Invalid form' };
  }

  toFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      transitive: new FormControl(),
      backwardCompatible: new FormControl(),
      forwardCompatible: new FormControl(),
      inherit: new FormControl(),
      ruleConfigurations: new FormArray([]),
    });
  }

  private trackChanges(): void {
    const subscription = this.form.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });

    this.subscriptions.add(subscription);
  }

  private trackInherit(): void {
    const subscription = this.form.controls.inherit.valueChanges.subscribe(inherit => {
      this.processInheritChanged(inherit);
    });

    this.subscriptions.add(subscription);
  }

  private processInheritChanged(inherit: boolean): void {
    if (inherit) {
      this.cachedForm = this.form.value;
      this.form.patchValue({
        transitive: this.inheritsFrom?.transitive,
        backwardCompatible: this.inheritsFrom?.backwardCompatible,
        forwardCompatible: this.inheritsFrom?.forwardCompatible,
      });

      this.form.controls.transitive.disable();
      this.form.controls.backwardCompatible.disable();
      this.form.controls.forwardCompatible.disable();
    } else {
      this.form.patchValue({
        transitive: this.cachedForm?.transitive,
        backwardCompatible: this.cachedForm?.backwardCompatible,
        forwardCompatible: this.cachedForm?.forwardCompatible,
      });

      this.form.controls.transitive.enable();
      this.form.controls.backwardCompatible.enable();
      this.form.controls.forwardCompatible.enable();
    }
  }
}
