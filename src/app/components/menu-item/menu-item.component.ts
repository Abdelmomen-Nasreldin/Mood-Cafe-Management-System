import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IMenuItem } from '../../models/menu-item';
import { OrderService } from '../../services/order.service';
import { calculateItemTotal, IOrderItem } from '../../models/order';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input({ required: true }) item!: IMenuItem;
  @Input() enableOrdering: boolean = false;

  private destroy$ = new Subject<void>();
  orderedItems: IOrderItem[] = [];

  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
    this._orderService
      .getOrderedSidebarItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.orderedItems = items;
      });
  }

  addToOrder(item: IMenuItem) {
    const orderedItem: IOrderItem = {
      id: `${+new Date()}-${Math.floor(Math.random() * 10000)}`,
      itemName: item.name,
      price: item.price,
      quantity: 1,
      total: item.price,
    };

    this._orderService.addOrderedSidebarItems(orderedItem);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
