import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

interface SelectorUserI {
  email: string;
  img?: string;
}

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSelectorComponent {
  private readonly DEFAULT_IMG = '/assets/icons/anonymous.svg';

  @ViewChild('userSearch') userInput: ElementRef |  undefined;
  selectedUser: SelectorUserI | undefined;
  isActive: boolean = false;

  constructor() {}

  get imgSrc(): string {
    return this.selectedUser?.img || this.DEFAULT_IMG;
  }

  toggleActivity(flag: boolean | undefined): void {
    this.isActive = flag === undefined ? !this.isActive : flag;

    if (this.isActive) {
      setTimeout(() => this.userInput?.nativeElement?.focus());
    }
  }
}
