import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderBoxComponent } from "../order-box/order-box.component";
import { IOrder, IOrderStatus } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { ModalService } from '../../services/modal.service';
import { OrderPrintComponent } from "../order-print/order-print.component";

@Component({
  selector: 'app-orders-wrapper',
  standalone: true,
  imports: [OrderBoxComponent, OrderPrintComponent],
  templateUrl: './orders-wrapper.component.html',
  styleUrl: './orders-wrapper.component.scss'
})
export class OrdersWrapperComponent {
  @Input() allOrders: IOrder[] = [];
  @Input() filteredOrders: IOrder[] = [];
  @Input() isEditAllowed = false;
  @Output() editOrder = new EventEmitter<string>();
  @Output() changeOrderStatus = new EventEmitter<{orderId: string, newStatus: IOrderStatus}>()

  printedOrder: IOrder | undefined;

  constructor(
    private _modalService: ModalService,
    private _orderService: OrderService,
  ) { }

  onEditOrder(orderID: string) {
    this.editOrder.emit(orderID)
  }

  printReceipt(orderId: string) {
    // open modal that has the order-print component
    this.printedOrder = this._orderService.getOrderById(orderId);
    this._modalService.openModal();
  }


  onChangeOrderStatus(orderStatusAndId: { orderId: string; newStatus: IOrderStatus }) {

    // console.log(orderStatusAndId.newStatus, orderStatusAndId.orderId);
    this.changeOrderStatus.emit(orderStatusAndId);

  }
}
