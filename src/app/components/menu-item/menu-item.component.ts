import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IMenuItem } from '../../models/menu-item';
import { OrderService } from '../../services/order.service';
import { IOrderItem } from '../../models/order';

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

  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
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
  }
}
