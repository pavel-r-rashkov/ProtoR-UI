import { Component, OnDestroy, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  FormGroup,
  ControlValueAccessor,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { RuleForm } from './rule-form';
import { RULE_DESCRIPTIONS } from './rule-descriptions';

@Component({
  selector: 'app-rule-form',
  templateUrl: './rule-form.component.html',
  styleUrls: ['./rule-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RuleFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: RuleFormComponent,
      multi: true
    },
    //{
    //  provide: MESSAGES_TOKEN,
    //  useValue: VALIDATION_MESSAGES
    //},
  ],
})
export class RuleFormComponent implements OnDestroy, ControlValueAccessor, Validator {
  @Input() inheritsFrom?: RuleForm;
  form: FormGroup;
  description: string = '';
  ruleCode: string = '';
  private cachedForm?: RuleForm;
  private onChange: any = () => undefined;
  private onTouched: any = () => undefined;
  private subscriptions: Subscription = new Subscription();

  constructor() {
    this.form = this.buildForm();
    this.trackInherit();
    this.trackChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  writeValue(obj: RuleForm): void {
    this.ruleCode = obj.ruleCode;
    this.description = RULE_DESCRIPTIONS[obj.ruleCode];
    this.cachedForm = obj;
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
    return this.form.valid ? null : { ruleFrom: 'Invalid form' };
  }

  convertSeverity(severity: any): number {
    return severity;
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      ruleCode: new FormControl(),
      severity: new FormControl(),
      inherit: new FormControl(),
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
        severity: this.inheritsFrom?.severity,
      });

      this.form.controls.severity.disable();
    } else {
      this.form.patchValue({
        severity: this.cachedForm?.severity,
      });

      this.form.controls.severity.enable();
    }
  }
}
