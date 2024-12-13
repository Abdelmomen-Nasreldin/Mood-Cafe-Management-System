import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IOrder } from '../../models/order';
import { OrderStatus, TRACKING_PERIODS, TRACKING_TIME } from '../../defines/defines';
import { TrackingService } from '../../services/tracking.service';
import { ExportService } from '../../services/export.service';
import { OrderService } from '../../services/order.service';
import { calculateOrderItemQuantity, calculateOrderTotal, filterOrders, sortOrders } from '../../utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersWrapperComponent } from '../../components/orders-wrapper/orders-wrapper.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { OrderStatusService } from '../../services/order-status.service';

@Component({
  selector: 'app-cancelled-page',
  standalone: true,
  imports: [CommonModule, FormsModule, OrdersWrapperComponent, DatePickerComponent],
  templateUrl: './cancelled-page.component.html',
  styleUrl: './cancelled-page.component.scss'
})
export class CancelledPageComponent implements OnInit {
    private destroy$ = new Subject<void>();

      @ViewChild('customerNameInput') customerNameInput! : ElementRef<HTMLInputElement>
      allOrders: IOrder[] = [];
      filteredOrders: IOrder[] = [];
      total = 0;
      selectedOrder = 'old';
      selectedTime = TRACKING_PERIODS.FROM_1ST_OF_MONTH as string;
      timeArr = TRACKING_TIME;

      selectedDate: string = "";
      secondSelectedDate: string = "";
      showSelectDate = false;
      showRangeSelectDate = false;
      allQuantities!: Record<string, number>;
      printedOrder: IOrder | undefined;
      isLoading = false;
      constructor(
        private _trackingService: TrackingService,
        private _exportService: ExportService,
        private _orderService: OrderService,
        private _orderStatusService: OrderStatusService
      ) {}

      ngOnInit(): void {
        this.loadOrders(TRACKING_PERIODS.FROM_1ST_OF_MONTH);
      }

      onDateChanged(date: string) {
        this.selectedDate = date; // Handle the date change event
        this.loadOrders(TRACKING_PERIODS.CUSTOM_DAY);
      }
      onRangeDateOneChanged(date: string) {
        this.selectedDate = date; // Handle the date change event
        if (this.selectedDate && this.secondSelectedDate) {
          this.loadOrders(TRACKING_PERIODS.FROM_CUSTOM_DATE_TO_DATE);
        }
      }
      onRangeDateTwoChanged(date: string) {
        this.secondSelectedDate = date;
        if (this.selectedDate && this.secondSelectedDate) {
          this.loadOrders(TRACKING_PERIODS.FROM_CUSTOM_DATE_TO_DATE);
        }
      }
  loadOrders(period: string) {
    this.isLoading = true;

    const isCustomDay = period === TRACKING_PERIODS.CUSTOM_DAY || period === TRACKING_PERIODS.FROM_CUSTOM_DATE_TO_DATE;
    const isRangeCustomDate = period === TRACKING_PERIODS.FROM_CUSTOM_DATE_TO_DATE;

    this._orderStatusService.cancelledOrders$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (orders) => {
        this.allOrders = this._trackingService.getOrdersByPeriod(orders, period, isCustomDay ? this.selectedDate : undefined, isRangeCustomDate ? this.secondSelectedDate : undefined);
        // this.allOrders = this.allOrders.filter(order => order.status === OrderStatus.CANCELLED);
        this.total = calculateOrderTotal(this.allOrders);
        this.filteredOrders = [...this.allOrders];
        this.calcQuantities();
        this.sortOrders();
        if (this.customerNameInput) {
          this.customerNameInput.nativeElement.value = "";
        }
        this.isLoading = false;
      }, error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

      onOrderChange() {
        this.sortOrders();
      }

      onTimeChange() : void {
        this.reset();
        switch (this.selectedTime) {
          case TRACKING_PERIODS.CUSTOM_DAY:
            this.showSelectDate = true;
            break;
          case TRACKING_PERIODS.FROM_CUSTOM_DATE_TO_DATE:
            this.showRangeSelectDate = true;
            break;
          default:
            this.loadOrders(this.selectedTime);
        }
      }

      reset() : void {
        this.showSelectDate = false;
        this.showRangeSelectDate = false;
        this.selectedDate = "";
        this.secondSelectedDate = "";
        this.allOrders = [];
        this.filteredOrders = [];
        this.calcQuantities();
        this.total = 0;
        if (this.customerNameInput) {
          this.customerNameInput.nativeElement.value = "";
        }
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
