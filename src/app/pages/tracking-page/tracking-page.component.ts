import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { IOrder } from '../../models/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TRACKING_PERIODS } from '../../defines/defines';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { calculateOrderItemQuantity, calculateOrderTotal } from '../../utils';
import { ModalService } from '../../services/modal.service';
import { OrderService } from '../../services/order.service';
import { OrderPrintComponent } from "../../components/order-print/order-print.component";

@Component({
  selector: 'app-tracking-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerComponent, OrderPrintComponent],
  templateUrl: './tracking-page.component.html',
  styleUrl: './tracking-page.component.scss',
})
export class TrackingPageComponent implements OnInit {
  allOrders: IOrder[] = [];
  total = 0;
  selectedOrder = 'old';
  selectedTime = TRACKING_PERIODS.FROM_1ST_OF_MONTH;
  timeArr: { text: string; value: string }[] = [
    {
      text: 'من أول الشهر',
      value: TRACKING_PERIODS.FROM_1ST_OF_MONTH,
    },
    {
      text: ' أخر 30 يوم',
      value: TRACKING_PERIODS.LAST_30_DAYS,
    },
    {
      text: ' أخر 7 أيام',
      value: TRACKING_PERIODS.LAST_7_DAYS,
    },
    {
      text: 'تاربخ معين',
      value: TRACKING_PERIODS.CUSTOM_DAY,
    },
  ];

  selectedDate: string = '';
  showSelectDate = false;
  allQuantities!: Record<string, number>;
  printedOrder: IOrder | undefined;

  constructor(
    private _trackingService: TrackingService,
    private _modalService: ModalService,
    private _orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.loadOrders(TRACKING_PERIODS.FROM_1ST_OF_MONTH);
  }

  onDateChanged(date: string) {
    this.selectedDate = date; // Handle the date change event
    this.loadOrders(this.selectedTime);
  }

  calcQuantities() {
    this.allQuantities = calculateOrderItemQuantity(this.allOrders);
  }

  loadOrders(period: string) {
    switch (period) {
      case TRACKING_PERIODS.FROM_1ST_OF_MONTH:
        this.allOrders = this._trackingService.getOrdersFromStartOfMonthAt7AM();
        break;
      case TRACKING_PERIODS.LAST_30_DAYS:
        this.allOrders = this._trackingService.getMonthlyOrders();
        break;
      case TRACKING_PERIODS.LAST_7_DAYS:
        this.allOrders = this._trackingService.getWeeklyOrders();
        break;
      case TRACKING_PERIODS.CUSTOM_DAY:
        this.allOrders = this._trackingService.getOrdersForSpecificDayAt7AM(
          new Date(this.selectedDate)
        );
        break;

      default:
        this.allOrders = this._trackingService.getOrdersFromStartOfMonthAt7AM();
        break;
    }

    this.total = calculateOrderTotal(this.allOrders);
    this.calcQuantities();
    this.sortOrders();
  }

  onOrderChange() {
    this.sortOrders();
  }

  onTimeChange() {
    if (this.selectedTime == (TRACKING_PERIODS.CUSTOM_DAY as string)) {
      this.showSelectDate = true;
    } else {
      this.showSelectDate = false;
    }
    this.selectedDate = '';
    this.loadOrders(this.selectedTime);
  }

  sortOrders() {
    if (this.selectedOrder == 'new') {
      this.allOrders.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      this.allOrders.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
  }

  printReceipt(orderId: string) {
    // open modal that has the order-print component
    this.printedOrder = this._orderService.getOrderById(orderId);
    this._modalService.openModal();
  }
}
