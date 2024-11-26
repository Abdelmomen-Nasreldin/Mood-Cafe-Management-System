import { Component, Input } from '@angular/core';
import { IOrder } from '../../models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-box.component.html',
  styleUrl: './order-box.component.scss'
})
export class OrderBoxComponent {

  @Input({required : true}) order! : IOrder;


  editOrder(orderID : string){}
  printReceipt(orderID : string){}
}
