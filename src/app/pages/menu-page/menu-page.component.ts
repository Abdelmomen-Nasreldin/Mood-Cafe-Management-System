import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';
import { MenuService } from '../../services/menu.service';
import { IMenuItem } from '../../models/menu-item';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderSidebarComponent } from "../../components/order-sidebar/order-sidebar.component";
import { IOrder } from '../../models/order';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [MenuItemComponent, OrderSidebarComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  menuItems: IMenuItem[] = [];
  enableOrdering = false;
  constructor(
    private _menuService: MenuService,
    private _orderService: OrderService
  ) {}

  CreateOrder() {
    this._orderService.setEnableOrdering(true)
  }

  cancel() {
    this._orderService.setEnableOrdering(false);
    this._orderService.resetOrderedSidebarItems();
  }


  ngOnInit(): void {
    this.menuItems = this._menuService.getMenuItems();
    this._orderService.enableOrdering.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.enableOrdering = value;
    });
  }

  setOrder(order: IOrder){
    this._orderService.saveOrder(order);
    this._orderService.resetOrderedSidebarItems();
  }

  ngOnDestroy(): void {
   this.destroy$.next();
   this.destroy$.complete();

   this._orderService.setEnableOrdering(false);
  }
}
