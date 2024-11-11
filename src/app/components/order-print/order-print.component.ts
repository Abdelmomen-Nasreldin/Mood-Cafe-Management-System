import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IOrder, IOrderItem } from '../../models/order';
import { Subject } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { calculateItemTotal, calculateOrderTotal } from '../../utils';

@Component({
  selector: 'app-order-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-print.component.html',
  styleUrl: './order-print.component.scss'
})
export class OrderPrintComponent implements OnChanges {
  private destroy$ = new Subject<void>();
  @Input({required : true}) order! : IOrder;
  currentDate = new Date();
  cafeName = 'Moods Cafe';


  ngOnChanges(changes: SimpleChanges): void {
  }

  constructor(private _orderService : OrderService){}

  printReceipt() {
    const printContents = document.querySelector('.receipt')?.innerHTML;

    if (printContents) {
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore the original content
    } else {
      console.error('Receipt content not found!');
    }
  }


    ngOnInit(): void {
    }



    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
