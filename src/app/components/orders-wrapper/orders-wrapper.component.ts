import { Component, Input } from '@angular/core';
import { OrderBoxComponent } from "../order-box/order-box.component";
import { IOrder } from '../../models/order';
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

  printedOrder: IOrder | undefined;

  constructor(
    private _modalService: ModalService,
    private _orderService: OrderService,
  ) {}

  printReceipt(orderId: string) {
    // open modal that has the order-print component
    this.printedOrder = this._orderService.getOrderById(orderId);
    this._modalService.openModal();
  }
}
