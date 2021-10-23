import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appToUppercase]'
})
export class ToUppercaseDirective {
  constructor(private readonly control: NgControl) {}

  @HostListener('input')
  onInput() {
    this.control?.control?.setValue(this.control.value.toUpperCase());
  }
}
