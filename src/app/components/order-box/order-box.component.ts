import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrder } from '../../models/order';
import { CommonModule } from '@angular/common';
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

  constructor() {}

  onEditOrder(orderID : string){
    this.editOrder.emit(orderID)
  }

  onPrintOrder(orderId : string){
    this.printOrder.emit(orderId)
  }

}
