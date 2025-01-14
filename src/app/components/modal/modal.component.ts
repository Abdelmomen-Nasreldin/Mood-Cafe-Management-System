import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrder } from '../../models/order';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input({ required: true }) order!: IOrder;
  @Input() isModalOpen = false;
  // @Output() changeOrderStatus = new EventEmitter<{
  //   orderId: string;
  //   newStatus: IOrderStatus;
  // }>();
  @Output() closeModal = new EventEmitter<void>();

  // currentDate = new Date();
  cafeName = 'Moods Cafe';
  // OrderStatusTranslations = Object.values(OrderStatusTranslations);
  // selectedOrderStatus!: IOrderStatus;

  constructor() {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log(changes);
  //   if (changes['isModalOpen']?.currentValue) {
  //     this.selectedOrderStatus = (
  //       changes['order'].currentValue as IOrder
  //     ).status;
  //     // console.log(this.selectedOrderStatus);

  //     this.isModalOpen = changes['isModalOpen'].currentValue;
  //   }
  // }

  onCloseModal() {
    this.closeModal.emit();
  }

  save() {
    // this.changeOrderStatus.emit({
    //   orderId: this.order.orderId,
    //   newStatus: this.selectedOrderStatus,
    // });
    this.closeModal.emit();
  }

  ngOnDestroy(): void {}
}
