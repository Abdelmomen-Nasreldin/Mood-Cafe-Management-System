import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { OrdersWrapperComponent } from "../../components/orders-wrapper/orders-wrapper.component";
import { DatePickerComponent } from "../../components/date-picker/date-picker.component";
import { IOrder } from "../../models/order";
import { OrderStatus, TRACKING_PERIODS, TRACKING_TIME } from "../../defines/defines";
import { ExportService } from "../../services/export.service";
import { calculateOrderItemQuantity, calculateOrderTotal, filterOrders, setDates, sortOrders } from "../../utils";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { OrderService } from "../../services/order.service";

@Component({
  selector: "app-paid-page",
  standalone: true,
  imports: [CommonModule, FormsModule, OrdersWrapperComponent, DatePickerComponent],
  templateUrl: "./paid-page.component.html",
  styleUrl: "./paid-page.component.scss",
})
export class PaidPageComponent implements OnInit {
  private destroy$ = new Subject<void>();

  @ViewChild("customerNameInput") customerNameInput!: ElementRef<HTMLInputElement>;
  allOrders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  total = 0;
  selectedOrder = "old";
  selectedTime = TRACKING_PERIODS.TODAY as string;
  // secondSelectedTime = TRACKING_PERIODS.FROM_1ST_OF_MONTH;
  timeArr = TRACKING_TIME;

  selectedDate: string = "";
  secondSelectedDate: string = "";
  showSelectDate = false;
  showRangeSelectDate = false;
  allQuantities!: Record<string, number>;
  printedOrder: IOrder | undefined;
  paidPostponedOrders: IOrder[] = [];
  filteredPaidPostponedOrders: IOrder[] = [];
  totalPaidPostponedOrders = 0;
  totalFilteredPaidPostponedOrders = 0;
  isLoading = false;
  constructor(
    private _exportService: ExportService,
    private _orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadOrders(TRACKING_PERIODS.TODAY);
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
    this._orderService.getOrdersByStatusAndPeriod(OrderStatus.PAID, selectedDate, secondSelectedDate || undefined).pipe(takeUntil(this.destroy$)).subscribe({
      next: (orders) => {

        this.allOrders = orders;
        this.total = calculateOrderTotal(orders);
        this.filteredOrders = orders;
        this.calcQuantities();
        if (this.customerNameInput) {
          this.customerNameInput.nativeElement.value = "";
        }
        this.isLoading = false;

      }, error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });

    this._orderService.getOrdersByStatusAndPeriod(OrderStatus.PAID_POSTPONED, selectedDate, secondSelectedDate || undefined).pipe(takeUntil(this.destroy$)).subscribe({
      next: (orders) => {
        this.paidPostponedOrders = orders;
        this.filteredPaidPostponedOrders = orders;
        this.totalPaidPostponedOrders = calculateOrderTotal(orders);
        this.totalFilteredPaidPostponedOrders = calculateOrderTotal(orders);
      }, error: (err) => {
        console.error(err);
      }
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
    this.selectedDate = "";
    this.secondSelectedDate = "";
    this.allOrders = [];
    this.paidPostponedOrders = [];
    this.filteredOrders = [];
    this.filteredPaidPostponedOrders = [];
    this.calcQuantities();
    this.total = 0;
    this.totalPaidPostponedOrders = 0;
    this.totalFilteredPaidPostponedOrders = 0;
    if (this.customerNameInput) {
      this.customerNameInput.nativeElement.value = "";
    }
  }

  sortOrders() {
    this.filteredOrders = sortOrders(this.filteredOrders, this.selectedOrder);
    this.filteredPaidPostponedOrders = sortOrders(this.filteredPaidPostponedOrders, this.selectedOrder);
  }

  searchByCustomerName(event: Event) {
    const input = event.target as HTMLInputElement; // Type assertion
    this.filteredOrders = filterOrders(this.allOrders, input.value);
    this.filteredPaidPostponedOrders = filterOrders(this.paidPostponedOrders, input.value);
    this.calcQuantities();
    this.totalFilteredPaidPostponedOrders = calculateOrderTotal(this.filteredPaidPostponedOrders);
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
