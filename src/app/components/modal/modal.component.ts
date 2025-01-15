import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IOrder } from '../../models/order';
import { FormsModule } from '@angular/forms';
import { CATEGORIES } from '../../defines/defines';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
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
  nameAr = '';
  nameEn = '';
  price = 0;
  category  = CATEGORIES[0].en;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['isModalOpen']?.currentValue) {
      this.isModalOpen = changes['isModalOpen'].currentValue;
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  onSave() {
    // this.changeOrderStatus.emit({
    //   orderId: this.order.orderId,
    //   newStatus: this.selectedOrderStatus,
    // });
    this.closeModal.emit();
  }

  ngOnDestroy(): void {}
}
