import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIES, ENGLISH_CATEGORIES } from '../../defines/defines';
import { MenuService } from '../../services/menu.service';
import { IMenuItem } from '../../models/menu-item';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit, OnChanges, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() isModalOpen = false;
  @Input() isEdit = false;
  @Input() menuItem : IMenuItem | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  cafeName = 'Moods Cafe';

  CATEGORIES = CATEGORIES;
  ENGLISH_CATEGORIES = ENGLISH_CATEGORIES
  nameAr = '';
  nameEn = '';
  price : number | null = null
  category = '';
  menuLength = 0;
  constructor(private _menuService: MenuService) {}
  ngOnInit(): void {
    this._menuService.getMenuItems().pipe(takeUntil(this.destroy$)).subscribe((menuItems) => {
      this.menuLength = menuItems.length;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'changes');

    if (changes['isModalOpen']?.currentValue) {
      this.isModalOpen = changes['isModalOpen'].currentValue;
    }

    if (changes['menuItem']?.currentValue) {
        this.nameAr = (changes['menuItem']?.currentValue as IMenuItem).name;
        this.nameEn = (changes['menuItem']?.currentValue as IMenuItem).english_name;
        this.price = (changes['menuItem']?.currentValue as IMenuItem).price;
        this.category = (changes['menuItem']?.currentValue as IMenuItem).category || '';
    }
  }

  onCloseModal() {
    this.closeModal.emit();
    this.resetForm();
  }

  onSave(): void {
    if (!this.nameAr.trim() || !this.nameEn.trim() || !this.price || this.price <= 0 || !this.category) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const newMenuItem: IMenuItem = {
      id: (this.menuLength + 1).toString(),
      name: this.nameAr,
      english_name: this.nameEn,
      price: this.price,
      category: this.category,
    };

    this._menuService.addMenuItem(newMenuItem);
    this.save.emit();
  }

  onEdit(): void {
    if (this.menuItem === null || !this.nameAr.trim() || !this.nameEn.trim() || !this.price || this.price <= 0 || !this.category) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const partiallyUpdatedItem = {
      name: this.nameAr.trim(),
      english_name: this.nameEn.trim(),
      price: this.price,
      category: this.category,
    }

    this._menuService.updateMenuItem(this.menuItem.id, partiallyUpdatedItem);

    this.save.emit();
  }

  resetForm() {
    this.nameAr = '';
    this.nameEn = '';
    this.price = null;
    this.category = '';
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('destroyed');
  }
}
