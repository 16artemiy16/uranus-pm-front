import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, forwardRef,
  HostListener,
  Input,
  OnChanges, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

type Option = {
  id: string | null;
  text: string;
  img?: string | null;
}

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorComponent),
      multi: true
    }
  ]
})
export class SelectorComponent implements OnChanges, ControlValueAccessor {
  @Input() options: Option[] = [];
  @Input() fallbackText: string = '';
  @Input() fallbackImg: string | null = null;

  @Output() onSelect: EventEmitter<string | null> = new EventEmitter<string | null>();

  @ViewChild('searchInput') searchInput: ElementRef | undefined;

  sortedOptions: Option[] = [this.fallbackOption];

  selectedId: string | null = null;
  isActive: boolean = false;
  readonly searchControl: FormControl = new FormControl('');

  private onChange = (value: any) => {};
  private onTouched = () => {};

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

  private sortOptions() {
    this.sortedOptions = this.selectedOption?.id
      ? [
        this.selectedOption,
        ...this.sortedOptions.filter((op) => op.id !== this.selectedId)
      ]
      : [this.fallbackOption, ...this.options];
  }

  ngOnChanges(changes: SimpleChanges) {
    const { options } = changes;
    if (options) {
      this.sortedOptions = [this.fallbackOption, ...options.currentValue];
    }
  }

  writeValue(val: string | null) {
    this.selectedId = val;
    this.sortOptions();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
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
      this.toggleActivity(false);
    }
  }

  setSelectedOption(id: string | null): void {
    this.selectedId = id;
    setTimeout(() => {
      this.searchControl.setValue(this.selectedOption?.text || this.fallbackText, { emitEvent: false });
      this.onChange(this.selectedId);
      this.sortOptions();
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
