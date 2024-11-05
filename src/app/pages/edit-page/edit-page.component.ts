import { Component } from '@angular/core';
import { IOrder } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { MenuService } from '../../services/menu.service';
import { IMenuItem } from '../../models/menu-item';
import { MenuItemComponent } from "../../components/menu-item/menu-item.component";
import { OrderSidebarComponent } from "../../components/order-sidebar/order-sidebar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { PAGES } from '../../defines/defines';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [MenuItemComponent, OrderSidebarComponent],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})
export class EditPageComponent {

  menuItems: IMenuItem[] = [];
  enableOrdering = true;
  orderId = '';
  editedOrder : IOrder | undefined;

  constructor(
    private _menuService: MenuService,
    private _orderService: OrderService,
    private _activatedRoute: ActivatedRoute,
    private _router : Router,
  ) {}

  cancel() {
    this._orderService.resetOrderedSidebarItems();
    // navigate to orders page
    this._router.navigate([PAGES.ORDERS]);
    // this._router.navigate([`../../${PAGES.ORDERS}`], {relativeTo: this._activatedRoute})
  }

  ngOnInit(): void {
    this.menuItems = this._menuService.getMenuItems();
    // get the orderId from the url
    this._activatedRoute.params.subscribe((data)=>{
      this.orderId = data['orderId'];
       this.editedOrder = this._orderService.getOrderById(this.orderId);
      if (!this.editedOrder) {
        this._router.navigate(['/'])
        return;
      }
      // set the orderSidebarItems to be the wanted order
      this._orderService.setOrderedSidebarItems(this.editedOrder.items);
    })
    //
  }

  setOrder(order: IOrder){
    console.log(order);

    this._orderService.updateOrder(order);
    this._orderService.resetOrderedSidebarItems();
    // navigate to orders page
    this._router.navigate([PAGES.ORDERS]);
  }

}
