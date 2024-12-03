import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IOrder, IOrderStatus } from '../../models/order';
import { OrderStatus, TRACKING_PERIODS, TRACKING_TIME } from '../../defines/defines';
import { TrackingService } from '../../services/tracking.service';
import { ExportService } from '../../services/export.service';
import { OrderStatusService } from '../../services/order-status.service';
import { calculateOrderItemQuantity, calculateOrderTotal, filterOrders, sortOrders } from '../../utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersWrapperComponent } from '../../components/orders-wrapper/orders-wrapper.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';

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
        private _orderStatusService: OrderStatusService,
      ) {}

      ngOnInit(): void {
        this.loadOrders(TRACKING_PERIODS.FROM_1ST_OF_MONTH);
      }

      onDateChanged(date: string) {
        this.selectedDate = date; // Handle the date change event
        this.loadOrders(this.selectedTime);
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

        this.allOrders = this.allOrders.filter((order) => order.status === OrderStatus.POSTPONED);

        // this._orderStatusService.getPostponedOrders().pipe(takeUntil(this.destroy$)).subscribe((orders) => { this.allOrders = orders });

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
    changeOrderStatus(orderStatusAndId: { orderId: string; newStatus: IOrderStatus; }) {
      this._orderStatusService.changeOrderStatus(orderStatusAndId);
  }
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
    }
