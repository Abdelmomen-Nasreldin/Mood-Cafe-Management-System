import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IOrder } from '../../models/order';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';    // Import FormsModule for ngModel
import { Router } from '@angular/router';
import { PAGES } from '../../defines/defines';
import { TrackingService } from '../../services/tracking.service';
import { calculateOrderTotal } from '../../utils';
import { OrderPrintComponent } from "../../components/order-print/order-print.component";
import { OrderService } from '../../services/order.service';
import { ModalService } from '../../services/modal.service';
import { OrderBoxComponent } from "../../components/order-box/order-box.component";
import { OrdersWrapperComponent } from "../../components/orders-wrapper/orders-wrapper.component";
@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule, OrderPrintComponent, OrderBoxComponent, OrdersWrapperComponent],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent implements OnInit {
  private destroy$ = new Subject<void>();
  @ViewChild('customerNameInput') customerNameInput! : ElementRef<HTMLInputElement>

  allOrders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  total = 0;
  timeArr = Array.from({ length: 24 - 7 + 1 }, (_, i) => i + 7); // Dynamic array from 1 to 24
  selectedTime = 7;  // Default selected time
  selectedOrder = 'old'
  printedOrder : IOrder | undefined;
  constructor(
    private _trackingService: TrackingService,
    private _orderService: OrderService,
    private _router: Router,
    private _modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(){
    this.allOrders = this._trackingService
      .getTodayOrdersFromCustomTime(this.selectedTime)
      // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date (newest to oldest)
    // .pipe(takeUntil(this.destroy$)).subscribe((orders => {
    //   this.allOrders = orders;
    // }))
    this.filteredOrders = [...this.allOrders];
    this.sortOrders();
    this.total = calculateOrderTotal(this.allOrders);
    if (this.customerNameInput) {
      this.customerNameInput.nativeElement.value = '';
    }
  }

  onTimeChange(){
    this.loadOrders();
  }

  sortOrders (){
    if(this.selectedOrder == 'new'){
      this.filteredOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      this.filteredOrders.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  }

  onOrderChange(){
    this.sortOrders();
  }

  editOrder(orderId: string) {
    // navigate to the edit page with the id;
    // in the edit page get the order (id from the url) and update it
    this._router.navigate([PAGES.EDIT, orderId]);
  }

  printReceipt(orderId : string){
    // open modal that has the order-print component
    this.printedOrder =  this._orderService.getOrderById(orderId);
    this._modalService.openModal();
  }

  searchByCustomerName(event: Event){
    const input = event.target as HTMLInputElement; // Type assertion
    const value = input.value.trim();
    if (value) {
      this.filteredOrders = this.allOrders.filter((order) =>
        order.customerName?.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredOrders = [...this.allOrders]; // Reset to full list if no input
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
