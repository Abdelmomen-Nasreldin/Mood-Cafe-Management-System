import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IOrder } from '../../models/order';
import { OrderStatus, TRACKING_PERIODS, TRACKING_TIME } from '../../defines/defines';
import { TrackingService } from '../../services/tracking.service';
import { ExportService } from '../../services/export.service';
import { calculateOrderItemQuantity, calculateOrderTotal, filterOrders, sortOrders } from '../../utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersWrapperComponent } from '../../components/orders-wrapper/orders-wrapper.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-postponed-page',
  standalone: true,
  imports: [CommonModule, FormsModule, OrdersWrapperComponent, DatePickerComponent],
  templateUrl: './postponed-page.component.html',
  styleUrl: './postponed-page.component.scss'
})
export class PostponedPageComponent implements OnInit {
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
          this.allOrders = this.allOrders.filter(order => order.status === OrderStatus.POSTPONED);
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
