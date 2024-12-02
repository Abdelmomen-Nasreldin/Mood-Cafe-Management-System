import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrder } from '../../models/order';
import { CommonModule } from '@angular/common';
import { ORDER_STATUS } from '../../defines/defines';
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
  orderStatus = ORDER_STATUS;
  constructor() {}

  onEditOrder(orderID : string){
    this.editOrder.emit(orderID)
  }

  onPrintOrder(orderId : string){
    this.printOrder.emit(orderId)
  }

  onOrderStatus(orderId: string) {

  }
}
