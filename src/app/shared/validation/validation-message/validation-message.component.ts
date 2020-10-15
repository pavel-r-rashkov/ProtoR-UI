import {
  Component,
  Optional,
  Injector,
  Inject,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Subscription } from 'rxjs';

import { MESSAGES_TOKEN, IMessages, MessageGenerator } from '../messages';

@Component({
  selector: '[appValidationMessage]',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements AfterViewInit, OnDestroy {
  error?: string;
  private inputRef?: MatFormFieldControl<MatInput>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Optional() @Inject(MESSAGES_TOKEN) private messages: IMessages,
    private injector: Injector) { }

  ngAfterViewInit() {
    const container = this.injector.get(MatFormField);
    this.inputRef = container._control;
    const subscription = this.inputRef.ngControl?.statusChanges?.subscribe((state) => this.updateErrors(state));
    this.subscriptions.add(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private updateErrors(state: 'VALID' | 'INVALID'): void {
    if (state === 'VALID') {
      this.error = undefined;
    } else {
      this.error = this.createMessage();
    }
  }

  private createMessage(): string | undefined {
    if (!this.inputRef?.ngControl?.name
      || !this.inputRef?.ngControl?.errors) {

      return;
    }

    const controlMessages = this.messages[this.inputRef.ngControl.name];
    const firstErrorKey = Object.keys(this.inputRef.ngControl.errors)[0];
    const firstError = this.inputRef.ngControl.errors[firstErrorKey];

    if (!controlMessages[firstErrorKey]) {
      return;
    }

    let message: string | undefined;
    const firstErrorMessage = controlMessages[firstErrorKey];

    if (this.isString(firstErrorMessage)) {
      message = firstErrorMessage;
    } else if (firstErrorMessage) {
      message = firstErrorMessage(firstError);
    }

    return message;
  }

  private isString(message: string | MessageGenerator | undefined): message is string {
    return (message as string).split !== undefined;
  }
}
