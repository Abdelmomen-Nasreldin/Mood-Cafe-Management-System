import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { IOrder } from '../../models/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TRACKING_PERIODS, TRACKING_TIME } from '../../defines/defines';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { calculateOrderItemQuantity, calculateOrderTotal } from '../../utils';
import { ExportService } from '../../services/export.service';
import { OrdersWrapperComponent } from "../../components/orders-wrapper/orders-wrapper.component";

@Component({
  selector: 'app-tracking-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePickerComponent,
    OrdersWrapperComponent
],
  templateUrl: './tracking-page.component.html',
  styleUrl: './tracking-page.component.scss',
})
export class TrackingPageComponent implements OnInit {
  @ViewChild('customerNameInput') customerNameInput! : ElementRef<HTMLInputElement>
  allOrders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  total = 0;
  selectedOrder = 'old';
  selectedTime = TRACKING_PERIODS.FROM_1ST_OF_MONTH;
  timeArr = TRACKING_TIME;

  selectedDate: string = '';
  showSelectDate = false;
  allQuantities!: Record<string, number>;
  printedOrder: IOrder | undefined;

  constructor(
    private _trackingService: TrackingService,
    private _exportService: ExportService,
  ) {}

  ngOnInit(): void {
    this.loadOrders(TRACKING_PERIODS.FROM_1ST_OF_MONTH);
  }

  onDateChanged(date: string) {
    this.selectedDate = date; // Handle the date change event
    this.loadOrders(this.selectedTime);
  }

  calcQuantities() {
    this.allQuantities = calculateOrderItemQuantity(this.filteredOrders);
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
    this.filteredOrders = [...this.allOrders];
    this.calcQuantities();
    this.sortOrders();
    if (this.customerNameInput) {
      this.customerNameInput.nativeElement.value = ''
    }
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
      this.filteredOrders.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      this.filteredOrders.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
  }

  searchByCustomerName(event: Event) {
    const input = event.target as HTMLInputElement; // Type assertion
    const value = input.value.trim().toLowerCase();
    if (value) {
      this.filteredOrders = this.allOrders.filter((order) =>
        order.customerName?.toLowerCase().includes(value)
      );
    } else {
      this.filteredOrders = [...this.allOrders]; // Reset to full list if no input
    }
    this.calcQuantities();
  }

  exportOrdersToCSV() {
    this._exportService.exportOrdersToCSV(this.allOrders);
  }
}
