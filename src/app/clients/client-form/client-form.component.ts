import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  ControlValueAccessor,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  Validators,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { MESSAGES_TOKEN, minCountValidator, SelectItem, uriValidator } from '@shared';
import { VALIDATION_MESSAGES } from './messages';
import { ClientForm } from './client-form';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClientFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ClientFormComponent,
      multi: true
    },
    {
      provide: MESSAGES_TOKEN,
      useValue: VALIDATION_MESSAGES
    },
  ],
})
export class ClientFormComponent implements OnDestroy, ControlValueAccessor, Validator {
  form: FormGroup;
  permissionsDisplayText: string = '';
  grantTypes: SelectItem[] = this.createGrantTypes();
  grantTypesDisplayText: string = '';
  uriValidator: ValidatorFn = uriValidator();
  private onChange: any = () => undefined;
  private onTouched: any = () => undefined;
  private subscription: Subscription = new Subscription();

  constructor() {
    this.form = this.buildForm();
    this.trackChanges();
    this.trackGrantTypeChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  writeValue(value: ClientForm): void {
    this.form.patchValue(value || {}, { emitEvent: false });
    this.setGrantDependentFieldsState(value.grantTypes || []);
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
    return this.form.valid ? null : { clientFrom: 'Invalid form' };
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      clientId: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      clientName: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      secret: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(500)]),
      grantTypes: new FormControl([], minCountValidator(1)),
      redirectUris: new FormControl([], minCountValidator(1)),
      postLogoutRedirectUris: new FormControl([], minCountValidator(1)),
      allowedCorsOrigins: new FormControl([], minCountValidator(1)),
      roleBindings: new FormControl([]),
      groupRestrictions: new FormControl([], minCountValidator(1)),
      isActive: new FormControl(false),
    });
  }

  private trackChanges(): void {
    const subscription = this.form.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });

    this.subscription.add(subscription);
  }

  private trackGrantTypeChanges(): void {
    const subscription = this.form.controls.grantTypes.valueChanges.subscribe(value => {
      this.setGrantDependentFieldsState(value);
    });

    this.subscription.add(subscription);
  }

  private setGrantDependentFieldsState(grantTypes: string[]): void {
    if (grantTypes.includes('authorization_code')) {
      this.form.controls.redirectUris.enable();
      this.form.controls.postLogoutRedirectUris.enable();
      this.form.controls.allowedCorsOrigins.enable();
    } else {
      this.form.controls.redirectUris.disable();
      this.form.controls.postLogoutRedirectUris.disable();
      this.form.controls.allowedCorsOrigins.disable();
    }

    if (grantTypes.includes('client_credentials')) {
      this.form.controls.secret.enable();
    } else {
      this.form.controls.secret.disable();
    }

    this.grantTypesDisplayText = this.grantTypes
      .filter(gt => grantTypes.includes(gt.id))
      .map(gt => gt.displayName)
      .join(', ');
  }

  private createGrantTypes(): SelectItem[] {
    return [
      { id: 'authorization_code', displayName: 'Authorization code' },
      { id: 'client_credentials', displayName: 'Client credentials' },
    ];
  }
}
