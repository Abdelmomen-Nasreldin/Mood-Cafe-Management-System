import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';
import { MenuService } from '../../services/menu.service';
import { IMenuItem } from '../../models/menu-item';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderSidebarComponent } from '../../components/order-sidebar/order-sidebar.component';
import { IOrder } from '../../models/order';
import { CATEGORIES, ENGLISH_CATEGORIES } from '../../defines/defines';

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
  filteredItems: IMenuItem[] = [];
  menuCategories: { en: string; ar: string }[] = [];
  enableOrdering = false;
  selectedCategory = ENGLISH_CATEGORIES.ALL;
  @ViewChild('searchInput') searchInputElement!:ElementRef;

  constructor(
    private _menuService: MenuService,
    private _orderService: OrderService
  ) { }

  CreateOrder() {
    // this._orderService.setEnableOrdering(true);
  }

  cancel() {
    this._orderService.setEnableOrdering(false);
    this._orderService.resetOrderedSidebarItems();
  }

  ngOnInit(): void {
    this.menuItems = this._menuService.getMenuItems();
    this._menuService.resetSelectedItems();
    this.menuCategories = CATEGORIES;
    this.filteredItems = [...this.menuItems];

    this._orderService.enableOrdering
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.enableOrdering = value;
      });
  }

  setOrder(order: IOrder) {
    this._orderService.saveOrder(order);
    this._orderService.resetOrderedSidebarItems();
  }

  searchMenuItems(event: Event) {
    const input = event.target as HTMLInputElement; // Type assertion
    const value = input.value.trim();
    if (value) {
      this.filteredItems = this.menuItems.filter(item =>
      ( (item.category === this.selectedCategory) || this.selectedCategory) &&
        item.name.toLowerCase().includes(value)
      );

    } else {
      this.filterItemsByCategory(this.selectedCategory);
    }
  }

  filterItemsByCategory(category: string) {
    this.selectedCategory = category as ENGLISH_CATEGORIES;
    this.searchInputElement.nativeElement.value = "";
    if (category === ENGLISH_CATEGORIES.ALL) {
      this.filteredItems = [...this.menuItems];
    } else {
      this.filteredItems = this.menuItems.filter(
        (item) => item.category === category
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this._orderService.setEnableOrdering(false);
  }
}
