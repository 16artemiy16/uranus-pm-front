import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-navigation-language',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="language" [matMenuTriggerFor]="langMenu">
      {{ currentLang$ | async }}
    </div>

    <mat-menu #langMenu="matMenu">
      <button
        mat-menu-item
        *ngFor="let lang of (langList$ | async)"
        (click)="changeLang(lang)"
      >
        {{ lang }}
      </button>
    </mat-menu>
  `,
  styles: [`
    .language {
      margin-right: 1.5em;
      cursor: pointer;
      border: 1px black solid;
      padding: 0 0.5em;
    }
  `]
})
export class NavigationLanguageComponent {
  currentLang$ = this.transloco.langChanges$;
  langList$ = this.transloco.langChanges$.pipe(
    map(() => this.transloco.getAvailableLangs() as string[])
  );

  constructor(
    private readonly transloco: TranslocoService,
  ) { }

  changeLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }
}
