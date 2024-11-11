import { Component, OnInit } from '@angular/core';
import { calculateOrderTotal, IOrder } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';    // Import FormsModule for ngModel
import { OrderEditComponent } from '../../components/order-edit/order-edit.component';
import { Router } from '@angular/router';
import { PAGES } from '../../defines/defines';
import { TrackingService } from '../../services/tracking.service';
@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule, OrderEditComponent],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent implements OnInit {
  private destroy$ = new Subject<void>();

  allOrders: IOrder[] = [];
  total = 0;
  timeArr = Array.from({ length: 24 }, (_, i) => i + 1); // Dynamic array from 1 to 24
  selectedTime = 7;  // Default selected time
  selectedOrder = 'old'
  constructor(
    private _trackingService: TrackingService,
    private _router: Router
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
    this.sortOrders();
    this.total = calculateOrderTotal(this.allOrders);
  }

  onTimeChange(){
    this.loadOrders();
  }

  sortOrders (){
    if(this.selectedOrder == 'new'){
      this.allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      this.allOrders.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
