import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderStatus } from '../../defines/defines';
import { DatePickerComponent } from "../../components/date-picker/date-picker.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controlling-page',
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './controlling-page.component.html',
  styleUrl: './controlling-page.component.scss'
})
export class ControllingPageComponent implements OnInit {

  orderStatus = OrderStatus;
  deletedOrderStatus: Partial<OrderStatus>[] = [];
  selectedDate: string = "";
  secondSelectedDate: string = "";

  DeletedStatus = OrderStatus.PAID;

  private readonly _orderService = inject(OrderService);
  ngOnInit(): void {
    this.deletedOrderStatus.push(OrderStatus.PAID, OrderStatus.PAID_POSTPONED, OrderStatus.CANCELLED);
  }

  deleteOrdersByStatusAndPeriod(status = OrderStatus.PAID) {
    this._orderService.deleteOrdersByStatusAndPeriod(status, this.selectedDate, this.secondSelectedDate || undefined)
  }

  onRangeDateOneChanged(date: string) {
    this.selectedDate = date; // Handle the date change event
  }
  onRangeDateTwoChanged(date: string) {
    this.secondSelectedDate = date; // Handle the date change event
  }
}
