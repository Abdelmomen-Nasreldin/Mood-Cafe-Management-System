import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { IOrder, IOrderStatus } from "../../models/order";
import { CommonModule } from "@angular/common";
import { OrderStatus, OrderStatusTranslations } from "../../defines/defines";
import { FormsModule } from "@angular/forms";
// import { OrderService } from '../../services/order.service';
// import { ModalService } from '../../services/modal.service';

@Component({
  selector: "app-order-box",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./order-box.component.html",
  styleUrl: "./order-box.component.scss",
})
export class OrderBoxComponent implements OnChanges {
  @Input({ required: true }) order!: IOrder;
  @Input() isEditAllowed = false;
  @Input() showCurrentOrderStatus = false;
  @Output() printOrder = new EventEmitter<string>();
  @Output() editOrder = new EventEmitter<string>();
  @Output() changeOrderStatus = new EventEmitter<string>();

  orderStatus = Object.values(OrderStatus);
  orderStatusTranslations : { en: IOrderStatus; ar: string }[]= Object.values(OrderStatusTranslations);
  currentOrderStatus!: { en: IOrderStatus; ar: string };
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']?.currentValue) {
      this.currentOrderStatus = this.orderStatusTranslations.find((item) => item.en === (changes['order'].currentValue as IOrder).status) || { en: OrderStatus.PAID, ar: 'مدفوع' };
    }
  }

  onEditOrder(orderID: string) {
    this.editOrder.emit(orderID);
  }

  onPrintOrder(orderId: string) {
    this.printOrder.emit(orderId);
  }

  onOrderStatus(orderId: string) {
    this.changeOrderStatus.emit(orderId);
  }

}
