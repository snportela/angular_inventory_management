import {Directive, ElementRef, forwardRef, HostListener} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyMaskDirective),
      multi: true,
    },
  ],
})
export class CurrencyMaskDirective implements ControlValueAccessor {
  private onChange = (value: number | null) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  writeValue(value: number | null): void {
    this.el.nativeElement.value = this.formatValue(value);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


  @HostListener('input', ['$event'])
  onInput(event: Event) {

    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const numericValue = this.unmaskValue(value);

    this.onChange(numericValue);

    this.el.nativeElement.value = this.formatValue(numericValue);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  private formatValue(value: number | null): string {
    if (value === null || value === undefined) {
      return '';
    }

    const formatted = value.toFixed(2).replace('.', ',');
    return `R$ ${formatted}`;
  }

  private unmaskValue(value: string): number | null {
    if (!value) {
      return null;
    }

    const digitsOnly = value.replace(/\D/g, '');
    if (!digitsOnly) {
      return null;
    }

    return parseFloat(digitsOnly) / 100;
  }
}
