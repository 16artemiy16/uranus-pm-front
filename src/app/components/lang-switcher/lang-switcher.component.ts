import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-lang-switcher',
  template: `
    <button (click)="change('en')">EN</button>
    <button (click)="change('ru')">RU</button>
  `,
  styles: [`

  `]
})
export class LangSwitcherComponent {

  constructor(
    private readonly transloco: TranslocoService
  ) { }

  change(lang: 'en' | 'ru') {
    this.transloco.setActiveLang(lang);
  }
}
