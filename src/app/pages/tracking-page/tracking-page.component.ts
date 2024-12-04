import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { IOrder } from '../../models/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  TRACKING_PERIODS, TRACKING_TIME } from '../../defines/defines';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { calculateOrderItemQuantity, calculateOrderTotal, filterOrders, sortOrders } from '../../utils';
import { ExportService } from '../../services/export.service';
import { OrdersWrapperComponent } from "../../components/orders-wrapper/orders-wrapper.component";
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../../services/order.service';

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
  private destroy$ = new Subject<void>();

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
    private _orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.loadOrders(TRACKING_PERIODS.FROM_1ST_OF_MONTH);
  }

  onDateChanged(date: string) {
    this.selectedDate = date; // Handle the date change event
    this.loadOrders(this.selectedTime);
  }

  loadOrders(period: string) {
    this._orderService.getAllOrders().pipe(takeUntil(this.destroy$)).subscribe(orders => {
      const isCustomDay = period === TRACKING_PERIODS.CUSTOM_DAY;
      this.allOrders = this._trackingService.getOrdersByPeriod(orders, period, isCustomDay ? this.selectedDate : undefined);
      // this.allOrders = this.allOrders.filter(order => order.status === OrderStatus.POSTPONED);
      this.total = calculateOrderTotal(this.allOrders);
      this.filteredOrders = [...this.allOrders];
      this.calcQuantities();
      this.sortOrders();
      if (this.customerNameInput) {
        this.customerNameInput.nativeElement.value = "";
      }
    });
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
    this.filteredOrders = sortOrders(this.filteredOrders, this.selectedOrder);
  }

  searchByCustomerName(event: Event) {
    const input = event.target as HTMLInputElement; // Type assertion
    this.filteredOrders = filterOrders(this.allOrders, input.value);
    this.calcQuantities();
  }

  calcQuantities() {
    this.allQuantities = calculateOrderItemQuantity(this.filteredOrders);
  }

  exportOrdersToCSV() {
    this._exportService.exportOrdersToCSV(this.allOrders);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
