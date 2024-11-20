import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IMenuItem } from '../../models/menu-item';
import { OrderService } from '../../services/order.service';
import { IOrderItem } from '../../models/order';
import { MenuService } from '../../services/menu.service';

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

  selectedMenuItems:IMenuItem[]= []

  constructor(
    private _orderService: OrderService,
    private _menuService: MenuService
  ) {}

  ngOnInit(): void {
  this.getSelectedMenuItems()
  }

  getSelectedMenuItems(){
    this._menuService.selectedMenuItems.subscribe(data=>{
      this.selectedMenuItems  = data;
    })
  }

  addToOrder(item: IMenuItem) {
    const orderedItem: IOrderItem = {
      id: `${+new Date()}-${Math.floor(Math.random() * 10000)}`,
      itemName: item.name,
      itemEnglishName: item.english_name,
      price: item.price,
      quantity: 1,
      total: item.price,
    };

    this._menuService.setSelectedItems(orderedItem.itemEnglishName, true);
    this._orderService.addOrderedSidebarItems(orderedItem);
  }

  ngOnDestroy(): void {}
}
