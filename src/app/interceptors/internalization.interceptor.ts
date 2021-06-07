import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class InternalizationInterceptor implements HttpInterceptor {

  constructor(
    private readonly transloco: TranslocoService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const i18nReq = request.clone({
      headers: request.headers.set('i18n-lang', this.transloco.getActiveLang())
    });
    return next.handle(i18nReq);
  }
}
