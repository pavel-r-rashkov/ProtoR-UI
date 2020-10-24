import {
  Component,
  Input,
  AfterViewInit,
  HostBinding,
  Self,
  Optional,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  ValidationErrors,
  AbstractControl,
  FormControl,
  ValidatorFn,
  NgControl,
} from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, Subscription } from 'rxjs';

import { ValidatorProxy } from '../validator-proxy';

@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: ChipInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ValidatorProxy,
      multi: true,
    },
    ValidatorProxy,
  ],
})
export class ChipInputComponent implements AfterViewInit, OnDestroy, ControlValueAccessor, Validator, MatFormFieldControl<string[]> {
  @Input() validators: ValidatorFn | ValidatorFn[] = [];
  @HostBinding() id = `chip-input-${ChipInputComponent.nextId++}`;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  visible: boolean = true;
  selectable: boolean = false;
  removable: boolean = true;
  addOnBlur: boolean = true;
  inputForm: FormControl = new FormControl('');
  values: string[] = [];
  stateChanges: Subject<void> =  new Subject<void>();
  focused: boolean = false;
  controlType?: string | undefined = 'chip-input';
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  private static nextId: number = 0;
  private controlPlaceholder: string = '';
  private isRequired: boolean = false;
  private onChange: any = () => undefined;
  private onTouched: any = () => undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private validatorProxy: ValidatorProxy,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>) {

    this.validatorProxy.validator = this;

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  get value(): string[] | null {
    return this.values;
  }

  set value(values: string[] | null) {
    this.values = values || [];
    this.stateChanges.next();
    this.emitValuesChanged();
  }

  @Input()
  get placeholder(): string {
    return this.controlPlaceholder;
  }

  set placeholder(placeholder: string) {
    this.controlPlaceholder = placeholder;
    this.stateChanges.next();
  }

  get empty(): boolean {
    return this.values.length === 0 && !this.inputForm.value;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Input()
  get required(): boolean {
    return this.isRequired;
  }

  set required(required: boolean) {
    this.isRequired = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this.inputForm.disabled;
  }

  set disabled(value: boolean) {
    this.setDisabledState(coerceBooleanProperty(value));
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.inputForm.status === 'INVALID' || this.ngControl.status === 'INVALID';
  }

  ngOnChanges(): void {
    this.inputForm.setValidators(this.validators);
    this.inputForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Fix issue where initial state is disabled but chip input remains active
    if (this.inputForm.disabled) {
      this.inputForm.disable();
    }

    const subscription = this.inputForm.valueChanges.subscribe(() => {
      this.onChange(this.values);
    });
    this.subscriptions.add(subscription);
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this.elementRef.nativeElement
      .querySelector('.chip-list')!;

    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elementRef.nativeElement.querySelector('input')?.focus();
    }
  }

  writeValue(values: string[]): void {
    this.values = values;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputForm.disable();
    } else {
      this.inputForm.enable();
    }
  }

  validate(_: AbstractControl): ValidationErrors | null {
    return this.inputForm.valid ? null : this.inputForm.errors;
  }

  add(event: MatChipInputEvent): void {
    if (this.inputForm.disabled || this.inputForm.invalid) {
      return;
    }

    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.values.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.emitValuesChanged();
  }

  remove(value: string): void {
    if (this.inputForm.disabled) {
      return;
    }

    const index = this.values.indexOf(value);

    if (index >= 0) {
      this.values.splice(index, 1);
    }

    this.emitValuesChanged();
  }

  emitValuesChanged(): void {
    this.onChange(this.values);
    this.onTouched();
  }
}
