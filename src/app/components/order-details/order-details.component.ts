import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { IOrder, IOrderStatus } from '../../models/order';
import { CommonModule } from '@angular/common';
import { OrderStatusTranslations } from '../../defines/defines';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnChanges, OnDestroy{
  @Input({ required: true }) order!: IOrder;
  @Input() isModalOpen = false;
  @Output() changeOrderStatus = new EventEmitter<{ orderId: string; newStatus: IOrderStatus }>();
  @Output() closeModal = new EventEmitter<void>();

  // currentDate = new Date();
  cafeName = 'Moods Cafe';
  OrderStatusTranslations = Object.values(OrderStatusTranslations);
  selectedOrderStatus!: IOrderStatus;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    if (changes['isModalOpen']?.currentValue) {
      this.selectedOrderStatus = (changes['order'].currentValue as IOrder).status;
      // console.log(this.selectedOrderStatus);

     this.isModalOpen = changes['isModalOpen'].currentValue;
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  save() {
    this.changeOrderStatus.emit({ orderId: this.order.orderId, newStatus: this.selectedOrderStatus });
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
  }
}
