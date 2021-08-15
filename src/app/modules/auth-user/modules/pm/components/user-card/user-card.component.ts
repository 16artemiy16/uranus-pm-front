import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  private readonly DEFAULT_IMG = '/assets/icons/anonymous.svg';
  @Input() email: string | undefined;
  @Input() img: string | undefined;

  constructor() { }

  get imgSrc(): string {
    return this.img || this.DEFAULT_IMG;
  }
}
