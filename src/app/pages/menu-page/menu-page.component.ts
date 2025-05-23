import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';
import { MenuService } from '../../services/menu.service';
import { IMenuItem } from '../../models/menu-item';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderSidebarComponent } from '../../components/order-sidebar/order-sidebar.component';
import { IOrder } from '../../models/order';
import { CATEGORIES, ENGLISH_CATEGORIES, ROLES } from '../../defines/defines';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../components/modal/modal.component";
import { User } from '../../models/user';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, OrderSidebarComponent, ModalComponent],
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

  userRole : User | null = null;
  isAdmin = false;
  ROLES = ROLES;

  // modal
  isModalOpen = false;
  // editMode
  editMode = false;
  editedMenuItem : IMenuItem | null = null;

  constructor(
    private readonly _menuService: MenuService,
    private readonly _orderService: OrderService,
    private readonly _authService: AuthService,
    private readonly _notifyService: NotifyService,
  ) {
    this._authService.getCurrentUserRole().subscribe((user) => {
      this.userRole = user;
    });
    console.log(this.userRole, 'userRole');

    this.isAdmin = this.userRole?.role === ROLES.ADMIN;
   }

  CreateOrder() {
    // this._orderService.setEnableOrdering(true);
  }

  cancel() {
    this._orderService.setEnableOrdering(false);
    this._orderService.resetOrderedSidebarItems();
  }

  ngOnInit(): void {
    this._menuService.getMenuItems().pipe(takeUntil(this.destroy$)).subscribe((items) => {
      this.menuItems = items;
      this.filteredItems = items;
      this._menuService.resetSelectedItems();
      this.menuCategories = CATEGORIES;
    });

    this._orderService.enableOrdering
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.enableOrdering = value;
      });
  }

  setOrder(order: IOrder) {
    this._orderService.saveOrder(order).then((res)=> {
      this._orderService.resetOrderedSidebarItems();
      this.showSuccessAlert();
    } )
    .catch((err)=> this.showErrorAlert(err));
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

  addMenuItems() {
    this._menuService.addMenuItems(this.menuItems);
  }

  addNewItemToMenu() {
    // open add new item modal
    // this._menuService.addMenuItem();
  }

  // modal
  openAddMenuItemModal() {
    this.editMode = false;
    this.editedMenuItem = null;
    this.isModalOpen = true;
  }

  closeModal() {
    this.editMode = false;
    this.editedMenuItem = null;
    this.isModalOpen = false;
  }

  onDeleteItem(item: IMenuItem) {
    // open delete modal to emphasize the deletion
    // this._menuService.deleteMenuItem(item.id);
  }
  onEditItem(item: IMenuItem) {
    // open edit modal
    console.log("edit item page", item);

    this.editMode = true;
    this.editedMenuItem = item;
    this.isModalOpen = true;
  }

  saveMenuItem(){
    this.closeModal();
  };

  // editMenuItem(){
  //   this.closeModal();
  // };
  showSuccessAlert() {
    this._notifyService.showSuccessAlert();
  }

  showErrorAlert(err: any) {
    this._notifyService.showErrorAlert();
    console.log('====================================');
    console.error(err);
    console.log('====================================');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this._orderService.setEnableOrdering(false);
  }
}






// showAlert() {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'This action cannot be undone!',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: 'Yes, delete it!',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Handle deletion logic
//       console.log('result',result);
//     }
//   })
// }