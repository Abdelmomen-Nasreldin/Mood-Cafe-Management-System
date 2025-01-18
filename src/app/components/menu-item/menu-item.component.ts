import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IMenuItem } from '../../models/menu-item';
import { OrderService } from '../../services/order.service';
import { IOrderItem } from '../../models/order';
import { MenuService } from '../../services/menu.service';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input({ required: true }) item!: IMenuItem;
  @Input() enableOrdering: boolean = false;
  @Input() canUseEdit: boolean = false;
  @Output() editItem = new EventEmitter<IMenuItem>();
  @Output() deleteItem = new EventEmitter<IMenuItem>();

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
      id: uuidv4(),
      itemName: item.name,
      itemEnglishName: item.english_name,
      price: item.price,
      quantity: 1,
      total: item.price,
    };

    this._menuService.setSelectedItems(orderedItem.itemEnglishName, true);
    this._orderService.addOrderedSidebarItems(orderedItem);
  }

  onEditItem(item: IMenuItem) {
    // open edit modal
    // this._menuService.updateMenuItem(item.id, item);
    console.log('edit item');

    this.editItem.emit(item);
  }

  onDeleteItem(item: IMenuItem) {
    // open delete modal to emphasize the deletion
    // this._menuService.deleteMenuItem(item.id);
    this.deleteItem.emit(item);
  }
  ngOnDestroy(): void {}
}
