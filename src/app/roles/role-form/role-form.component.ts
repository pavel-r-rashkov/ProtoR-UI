import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  FormGroup,
  ValidationErrors,
  AbstractControl,
  Validators,
  FormControl,
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { MESSAGES_TOKEN, SelectItem } from '@shared';
import { VALIDATION_MESSAGES } from './messages';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RoleFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: RoleFormComponent,
      multi: true
    },
    {
      provide: MESSAGES_TOKEN,
      useValue: VALIDATION_MESSAGES
    },
  ],
})
export class RoleFormComponent implements OnDestroy, ControlValueAccessor, Validator {
  @Input() permissions: SelectItem[] = [];
  form: FormGroup;
  permissionsDisplayText: string = '';
  private onChange: any = () => undefined;
  private onTouched: any = () => undefined;
  private subscription: Subscription = new Subscription();

  constructor() {
    this.form = this.buildForm();
    this.trackChanges();
    this.generatePermissionsDisplayText();
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
    return this.form.valid ? null : { roleFrom: 'Invalid form' };
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      permissions: new FormControl([]),
    });
  }

  private trackChanges(): void {
    const subscription = this.form.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });

    this.subscription.add(subscription);
  }

  private generatePermissionsDisplayText(): void {
    const subscription = this.form.controls.permissions.valueChanges.subscribe(permissionIds => {
      this.permissionsDisplayText = permissionIds
        .map((id: number) => this.permissions.find(p => p.id === id)?.displayName)
        .join(', ');
    });

    this.subscription.add(subscription);
  }
}
