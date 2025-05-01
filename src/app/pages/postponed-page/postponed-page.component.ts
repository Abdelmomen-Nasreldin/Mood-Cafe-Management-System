import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { IOrder } from '../../models/order';
import {
  DEBOUNCE_TIME,
  OrderStatus,
  // OrderStatus,
  TRACKING_PERIODS,
  TRACKING_TIME,
} from '../../defines/defines';
import { ExportService } from '../../services/export.service';
import {
  calculateOrderItemQuantity,
  calculateOrderTotal,
  filterOrders,
  setDates,
  sortOrders,
} from '../../utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersWrapperComponent } from '../../components/orders-wrapper/orders-wrapper.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { OrderService } from '../../services/order.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-postponed-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OrdersWrapperComponent,
    DatePickerComponent,
    InfiniteScrollDirective
  ],
  templateUrl: './postponed-page.component.html',
  styleUrl: './postponed-page.component.scss',
})
export class PostponedPageComponent implements OnInit {
  private destroy$ = new Subject<void>();

  @ViewChild('customerNameInput')
  customerNameInput!: ElementRef<HTMLInputElement>;
  allOrders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  total = 0;
  totalFiltered = 0;
  selectedOrder = 'old';
  selectedTime = TRACKING_PERIODS.TODAY as string;
  timeArr = TRACKING_TIME;

  selectedDate: string = '';
  secondSelectedDate: string = '';
  showSelectDate = false;
  showRangeSelectDate = false;
  allQuantities!: Record<string, number>;
  printedOrder: IOrder | undefined;
  isLoading = false;

  displayedOrders: IOrder[] = [];
  limit = 20;
  step = 10;

  private readonly customerNameInput$ = new Subject<string>();

  constructor(
    private _exportService: ExportService,
    private _orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.loadOrders(TRACKING_PERIODS.TODAY);
    this.setupCustomerNameSearch();
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

    const { selectedDate, secondSelectedDate } = setDates(period, this.selectedDate, this.secondSelectedDate);
    this._orderService.getOrdersByStatusAndPeriod(OrderStatus.POSTPONED, selectedDate, secondSelectedDate || undefined)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (orders) => {

          this.allOrders = orders;
          this.total = calculateOrderTotal(orders);
          this.filteredOrders = [...orders];
          this.displayedOrders = this.filteredOrders.slice(0, this.limit);
          this.totalFiltered = calculateOrderTotal(this.filteredOrders);
          this.calcQuantities();
          // this.sortOrders();
          if (this.customerNameInput?.nativeElement.value) {
            // this.customerNameInput.nativeElement.value = "";
            this.searchByCustomerName({
              target: {
                value: this.customerNameInput?.nativeElement.value.trim(),
              },
            } as any);
          }

          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
        },
      });
  }

  onOrderChange() {
    this.sortOrders();
  }

  onTimeChange(): void {
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

  reset(): void {
    this.showSelectDate = false;
    this.showRangeSelectDate = false;
    this.selectedDate = '';
    this.secondSelectedDate = '';
    this.allOrders = [];
    this.filteredOrders = [];
    this.displayedOrders = [];
    this.calcQuantities();
    this.total = 0;
    this.totalFiltered = 0;
    if (this.customerNameInput) {
      this.customerNameInput.nativeElement.value = '';
    }
  }
  sortOrders() {
    this.filteredOrders = sortOrders(this.filteredOrders, this.selectedOrder);
    this.displayedOrders = this.filteredOrders.slice(0, this.limit);
  }

  private setupCustomerNameSearch(): void {
    this.customerNameInput$.pipe(
      tap((value) => {
        this.isLoading = true;
      }),
      debounceTime(DEBOUNCE_TIME),
      switchMap((value) => {
        this.filteredOrders = filterOrders(this.allOrders, value);
        this.displayedOrders = this.filteredOrders.slice(0, this.limit);
        this.calcQuantities();
        this.totalFiltered = calculateOrderTotal(this.filteredOrders);
        return of(value);
      }),
      takeUntil(this.destroy$) // <-- Important!
    )
    .subscribe({
      next: (value) => {
        this.isLoading = false;
        console.log('Final emitted value after filtering:', value);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error during customer name search:', error);
      }
    });
  }

  searchByCustomerName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.customerNameInput$.next(input.value);
  }

  calcQuantities() {
    this.allQuantities = calculateOrderItemQuantity(this.filteredOrders);
  }

  exportOrdersToCSV() {
    this._exportService.exportOrdersToCSV(this.allOrders);
  }

  loadMore(): void {
    if (this.isLoading || this.displayedOrders.length >= this.filteredOrders.length) {
      return;
    }
    console.log('Loading more orders...');

    this.isLoading = true;

    const nextItems = this.filteredOrders.slice(
      this.displayedOrders.length,
      this.displayedOrders.length + this.step
    );

    if (nextItems.length > 0) {
      this.displayedOrders = [...this.displayedOrders, ...nextItems];
    }

    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
