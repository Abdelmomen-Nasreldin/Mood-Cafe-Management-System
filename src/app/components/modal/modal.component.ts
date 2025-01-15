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
  // @Input({ required: true }) order!: IOrder;
  @Input() isModalOpen = false;
  // @Output() changeOrderStatus = new EventEmitter<{
  //   orderId: string;
  //   newStatus: IOrderStatus;
  // }>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  // currentDate = new Date();
  cafeName = 'Moods Cafe';
  // OrderStatusTranslations = Object.values(OrderStatusTranslations);
  // selectedOrderStatus!: IOrderStatus;
  CATEGORIES = CATEGORIES;
  ENGLISH_CATEGORIES = ENGLISH_CATEGORIES
  nameAr = '';
  nameEn = '';
  price = '';
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
      const newMenuItem: IMenuItem = {
        id: (this.menuLength + 1).toString(),
        name: this.nameAr,
        english_name: this.nameEn,
        price: +this.price,
        category: this.category,
      };

      this._menuService.addMenuItem(newMenuItem);
      this.closeModal.emit();
  }

  ngOnDestroy(): void {}
}
