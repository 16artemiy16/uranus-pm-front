import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToUppercaseDirective } from './to-uppercase.directive';

@NgModule({
  declarations: [
    ToUppercaseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToUppercaseDirective
  ]
})
export class ToUppercaseModule { }
