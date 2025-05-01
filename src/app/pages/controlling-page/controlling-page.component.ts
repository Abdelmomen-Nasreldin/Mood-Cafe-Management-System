import { Component, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderStatus } from '../../defines/defines';
import { DatePickerComponent } from "../../components/date-picker/date-picker.component";

@Component({
  selector: 'app-controlling-page',
  standalone: true,
  imports: [DatePickerComponent],
  templateUrl: './controlling-page.component.html',
  styleUrl: './controlling-page.component.scss'
})
export class ControllingPageComponent {
  private readonly _orderService = inject(OrderService);
  orderStatus = OrderStatus;

  selectedDate: string = "";
  secondSelectedDate: string = "";

  deleteOrdersByStatusAndPeriod(status = OrderStatus.PAID) {
    console.log('====================================');
    console.log('deleteOrdersByStatusAndPeriod', status, this.selectedDate, this.secondSelectedDate);
    console.log('====================================');
    this._orderService.deleteOrdersByStatusAndPeriod(status, this.selectedDate, this.secondSelectedDate || undefined);
  }

  onRangeDateOneChanged(date: string) {
    this.selectedDate = date; // Handle the date change event
  }
  onRangeDateTwoChanged(date: string) {
    this.secondSelectedDate = date; // Handle the date change event
  }
}
