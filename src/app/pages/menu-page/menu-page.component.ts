import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';
import { MenuService } from '../../services/menu.service';
import { IMenuItem } from '../../models/menu-item';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [MenuItemComponent],
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
    this._orderService.setEnableOrdering(false)
  }

  
  ngOnInit(): void {
    this.menuItems = this._menuService.getMenuItems();
    this._orderService.enableOrdering.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.enableOrdering = value;
    });
  }

  ngOnDestroy(): void {
   this.destroy$.next();
   this.destroy$.complete();

   this._orderService.setEnableOrdering(false);
  }
}
