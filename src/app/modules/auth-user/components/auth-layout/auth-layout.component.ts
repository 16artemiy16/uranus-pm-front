import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  currentLang$ = this.transloco.langChanges$;
  langList$ = this.transloco.langChanges$.pipe(
    map(() => this.transloco.getAvailableLangs() as string[])
  );

  constructor(
    private readonly transloco: TranslocoService,
    private readonly userService: UserService
  ) { }

  changeLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }

  logOut() {
    this.userService.logOut();
  }
}
