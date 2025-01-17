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
import { IOrder } from '../../models/order';
import { FormsModule } from '@angular/forms';
import { CATEGORIES, ENGLISH_CATEGORIES } from '../../defines/defines';
import { MenuService } from '../../services/menu.service';
import { IMenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isModalOpen = false;
  @Input() isEdit = false;
  @Input() menuItem = {} as IMenuItem;

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
    this._menuService.getMenuItems().subscribe((menuItems) => {
      this.menuLength = menuItems.length;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['isModalOpen']?.currentValue) {
      this.isModalOpen = changes['isModalOpen'].currentValue;
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  onSave(): void {
    if (!this.nameAr.trim() || !this.nameEn.trim() || !this.price || this.price <= 0, !this.category) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const newMenuItem: IMenuItem = {
      id: (this.menuLength + 1).toString(),
      name: this.nameAr,
      english_name: this.nameEn,
      price: this.price ?? 0,
      category: this.category,
    };

    this._menuService.addMenuItem(newMenuItem);
    this.closeModal.emit();
  }

  onEdit(): void {
    if (!this.nameAr.trim() || !this.nameEn.trim() || !this.price || this.price <= 0, !this.category) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const partiallyUpdatedItem = {
      name: this.nameAr.trim() || this.menuItem.name,
      english_name: this.nameEn.trim() || this.menuItem.english_name,
      price: this.price || this.menuItem.price,
      category: this.category.trim() || this.menuItem.category,
    }

    this._menuService.updateMenuItem(this.menuItem.id, partiallyUpdatedItem);

    this.closeModal.emit();
  }

  ngOnDestroy(): void {}
}
