import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges, SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';

type Option = {
  id: string | null;
  text: string;
  img?: string | null;
}

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent implements OnChanges {
  @Input() options: Option[] = [];
  @Input() fallbackText: string = '';
  @Input() fallbackImg: string | null = null;
  @ViewChild('searchInput') searchInput: ElementRef | undefined;

  sortedOptions: Option[] = [this.fallbackOption];

  selectedId: string | null = null;
  isActive: boolean = false;
  readonly searchControl: FormControl = new FormControl('');

  constructor(
    private readonly cdRef: ChangeDetectorRef
  ) {
    this.searchControl.valueChanges
      .subscribe((searchStr) => {
        const predicate = (isMatched: boolean) => {
          return (option: Option) => isMatched === (option.text.indexOf((searchStr || '').trim()) === 0);
        };
        const firstOptions = this.options.filter(predicate(true));
        const lastOptions = this.options.filter(predicate(false));

        this.sortedOptions = [this.fallbackOption, ...firstOptions, ...lastOptions];
        this.cdRef.markForCheck();
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    const { options } = changes;
    if (options) {
      this.sortedOptions = [this.fallbackOption, ...options.currentValue];
    }
  }

  private getOption(id: string | null): Option | null {
    return this.sortedOptions.find((op) => op.id === id) || null;
  }

  get selectedOption(): Option | null {
    return this.getOption(this.selectedId) || null;
  }

  get fallbackOption(): Option {
    return { id: null, text: this.fallbackText, img: this.fallbackImg };
  }

  @HostListener('click', ['$event'])
  clickInside($event: MouseEvent) {
    $event.stopPropagation();
  }

  @HostListener('document:click')
  clickOutside() {
    if (this.isActive) {
      this.isActive = false;
    }
  }

  setSelectedOption(id: string | null): void {
    this.selectedId = id;
    setTimeout(() => {
      this.searchControl.setValue(this.selectedOption?.text || this.fallbackText, { emitEvent: false });
    });
  }

  toggleActivity(flag: boolean | undefined): void {
    this.isActive = flag === undefined ? !this.isActive : flag;

    if (this.isActive) {
      setTimeout(() => {
        this.searchControl.setValue(this.selectedOption?.text || this.fallbackText);
        this.searchInput?.nativeElement?.focus();
      });
    }
  }
}
