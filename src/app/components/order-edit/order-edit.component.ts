import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { calculateItemTotal, calculateOrderTotal, IOrder, IOrderItem } from '../../models/order';
import { Subject } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.scss'
})
export class OrderEditComponent implements OnChanges {
  private destroy$ = new Subject<void>();
  @Input() order! : IOrder;
  orderedItems : IOrderItem[] = []
  OrderTotal = 0;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']?.currentValue) {
      console.log(changes['order']?.currentValue);

      this.orderedItems = (changes['order'].currentValue as IOrder).items
      this.OrderTotal = (changes['order'].currentValue as IOrder).total
    }
  }

  constructor(private _orderService : OrderService){}


    ngOnInit(): void {
    }

    updateQuantity(id: string, change: number): void {
      const itemIndex = this.orderedItems.findIndex(ele => ele.id == id);
      if (itemIndex == -1) {
        return;
      }

      this.orderedItems[itemIndex].quantity += change;

      // Ensure quantity does not go below zero
      if (this.orderedItems[itemIndex].quantity < 1) {
        this.orderedItems[itemIndex].quantity = 1;
      }

      this.orderedItems[itemIndex].total = calculateItemTotal(this.orderedItems[itemIndex]);
      this.updateOrderTotal();
    }

    increaseQuantity(id: string): void {
      this.updateQuantity(id, 1);
    }

    decreaseQuantity(id: string): void {
      this.updateQuantity(id, -1);
    }

    deleteItem(id : string){
       this.orderedItems = this.orderedItems.filter(ele=>ele.id !== id);
       this.updateOrderTotal();
    }

    updateOrderTotal(): void {
      this.OrderTotal = calculateOrderTotal(this.orderedItems);
    }

    saveOrder(){
      this.order.items = [...this.orderedItems];
      this.order.total = this.OrderTotal;
      this._orderService.updateOrder(this.order);
    }

    cancel(){
      console.log('canceled');
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
