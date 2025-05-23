import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderBoxComponent } from "../order-box/order-box.component";
import { IOrder, IOrderStatus } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { ModalService } from '../../services/modal.service';
import { OrderPrintComponent } from "../order-print/order-print.component";
import { OrderDetailsComponent } from "../order-details/order-details.component";
import { OrderStatusService } from '../../services/order-status.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-orders-wrapper',
  standalone: true,
  imports: [OrderBoxComponent, OrderPrintComponent, OrderDetailsComponent],
  templateUrl: './orders-wrapper.component.html',
  styleUrl: './orders-wrapper.component.scss'
})
export class OrdersWrapperComponent {
  @Input() allOrders: IOrder[] = [];
  @Input() filteredOrders: IOrder[] = [];
  @Input() isEditAllowed = false;
  @Input() showCurrentOrderStatus = false;
  @Output() editOrder = new EventEmitter<string>();
  // @Output() changeOrderStatus = new EventEmitter<{orderId: string, newStatus: IOrderStatus}>()

  printedOrder: IOrder | undefined;
  statusChangedOrder: IOrder | undefined;
  isModalOpen = false;
  constructor(
    private readonly _modalService: ModalService,
    private readonly _orderService: OrderService,
    private readonly _orderStatusService: OrderStatusService,
    private readonly _notifyService: NotifyService,
  ) { }

  onEditOrder(orderID: string) {
    this.editOrder.emit(orderID)
  }

  printReceipt(orderId: string) {
    // open modal that has the order-print component
    this._orderService.getOrderById(orderId).then((order) => {
      this.printedOrder = order;
      this._modalService.openModal();
    });
  }


  onChangeOrderStatus(orderId: string) {
    this._orderService.getOrderById(orderId).then((order) => {
      this.statusChangedOrder = order;
      this.openOderDetailsModal();
    });
  }

  onChangeOrderDetails(orderStatusAndId: { orderId: string; newStatus: IOrderStatus; }) {
    this._orderStatusService.changeOrderStatus(orderStatusAndId)
    .then((res)=> {
      this.showSuccessAlert();
      this.closeOderDetailsModal();
    })
    .catch((err)=> this.showErrorAlert(err));
  }

  openOderDetailsModal() {
    this.isModalOpen = true;
  }

  closeOderDetailsModal() {
    this.isModalOpen = false;
  }

  showSuccessAlert() {
    this._notifyService.showSuccessAlert();
  }

  showErrorAlert(err: any) {
    this._notifyService.showErrorAlert();
    console.log('====================================');
    console.error(err);
    console.log('====================================');
  }
}
