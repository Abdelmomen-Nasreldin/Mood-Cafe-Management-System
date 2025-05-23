import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IOrder } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { MenuService } from '../../services/menu.service';
import { IMenuItem } from '../../models/menu-item';
import { MenuItemComponent } from "../../components/menu-item/menu-item.component";
import { OrderSidebarComponent } from "../../components/order-sidebar/order-sidebar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CATEGORIES, ENGLISH_CATEGORIES, PAGES } from '../../defines/defines';
import { Subject, takeUntil } from 'rxjs';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [MenuItemComponent, OrderSidebarComponent],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})
export class EditPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  menuItems: IMenuItem[] = [];
  filteredItems: IMenuItem[] = [];

  enableOrdering = true;
  orderId = '';
  editedOrder : IOrder | undefined;
  menuCategories: { en: string; ar: string }[] = [];
  selectedCategory = ENGLISH_CATEGORIES.ALL;
  @ViewChild('searchInput') searchInputElement!:ElementRef;

  constructor(
    private readonly _menuService: MenuService,
    private readonly _orderService: OrderService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router : Router,
    private readonly _notifyService: NotifyService,
  ) {}

  cancel() {
    this._orderService.resetOrderedSidebarItems();
    // navigate to orders page
    this._router.navigate([PAGES.ORDERS]);
    // this._router.navigate([`../../${PAGES.ORDERS}`], {relativeTo: this._activatedRoute})
  }

  ngOnInit(): void {
    this._menuService.getMenuItems().pipe(takeUntil(this.destroy$)).subscribe((items) => {
      this.menuItems = items;
      this.filteredItems = items;
      this.menuCategories = CATEGORIES;
    })
    // get the orderId from the url
    this._activatedRoute.params.subscribe(async (data)=>{
      this.orderId = data['orderId'];
      this.editedOrder  = await this._orderService.getOrderById(this.orderId)

       this.editedOrder?.items.forEach(item=>{
        this._menuService.setSelectedItems(item.itemEnglishName,true);
       })
      if (!this.editedOrder) {
        this._menuService.resetSelectedItems()
        this._router.navigate(['/']);
        return;
      }
      // set the orderSidebarItems to be the wanted order
      this._orderService.setOrderedSidebarItems(this.editedOrder.items);
    });
    //
  }

  setOrder(order: IOrder){
    order.items.forEach(item=>{
      this._menuService.setSelectedItems(item.itemEnglishName,true)
    })
    this._orderService.updateOrder(order).then((res)=> {
      this._orderService.resetOrderedSidebarItems();
      this.showSuccessAlert().then(()=>{
        this._router.navigate([PAGES.ORDERS]);
      })
    } )
    .catch((err)=> this.showErrorAlert(err));
    // navigate to orders page
  }

  searchMenuItems(event: Event) {
    const input = event.target as HTMLInputElement; // Type assertion
    const value = input.value;
    if (value) {
      this.filteredItems = this.menuItems.filter(item =>
        ((item.category === this.selectedCategory) || this.selectedCategory )&&
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

  showSuccessAlert() {
    return this._notifyService.showSuccessAlert();
  }

  showErrorAlert(err: any) {
    console.log('====================================');
    console.error(err);
    console.log('====================================');
    return this._notifyService.showErrorAlert();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
