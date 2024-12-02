import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrder, IOrderStatus } from '../../models/order';
import { CommonModule } from '@angular/common';
import { OrderStatus, OrderStatusTranslations } from '../../defines/defines';
// import { OrderService } from '../../services/order.service';
// import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-order-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-box.component.html',
  styleUrl: './order-box.component.scss'
})
export class OrderBoxComponent {

  @Input({required : true}) order! : IOrder;
  @Input() isEditAllowed = false;
  @Output() printOrder = new EventEmitter<string>()
  @Output() editOrder = new EventEmitter<string>()
  @Output() changeOrderStatus = new EventEmitter<{orderId: string, newStatus: IOrderStatus}>()

  orderStatus = Object.values(OrderStatus);
  OrderStatusTranslations = Object.values(OrderStatusTranslations);
  constructor() {}

  onEditOrder(orderID : string){
    this.editOrder.emit(orderID)
  }

  onPrintOrder(orderId : string){
    this.printOrder.emit(orderId)
  }

  onOrderStatus(orderId: string, OrderStatus: IOrderStatus) {
    this.changeOrderStatus.emit({orderId, newStatus: OrderStatus});
  }
}
