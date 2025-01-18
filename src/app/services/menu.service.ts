import { Injectable } from '@angular/core';
import { IMenuItem } from '../models/menu-item';
import { BehaviorSubject, from, map, Observable, tap } from 'rxjs';
import { db } from '../indexedDB/order-database';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  selectedMenuItems = new BehaviorSubject<IMenuItem[]>([]);
  private items: IMenuItem[] = [];
  private menuItemsCache$?: Observable<IMenuItem[]>;

  constructor() {}

  /**
   * Method to add a new menu item
   * @param item - The new menu item to be added
   */
  async addMenuItem(item: IMenuItem): Promise<void> {
    await db.menuItems.add(item).then((id) => {
      this.resetCache();
    });
  }

  /**
   * Method to add multiple new menu items
   * @param items - The new menu items to be added
   */
  async addMenuItems(items: IMenuItem[]): Promise<void> {
    await db.menuItems.bulkAdd(items).then((items) => {
      this.resetCache();
    });
  }

  /**
   * Method to update an existing menu item
   * @param id - The id of the menu item to be updated
   * @param updatedItem - The updated menu item
   */
  async updateMenuItem(id: string, updatedItem: Partial<IMenuItem>): Promise<void> {
    await db.menuItems.update(id, updatedItem).then((id) => {
      this.resetCache();
    });
  }

  /**
   * Deletes a menu item by its ID
   * @param id The ID of the menu item to delete
   */
  async deleteMenuItem(id: string): Promise<void> {
    try {
      await db.menuItems.delete(id).then((id) => {
        this.resetCache();
      });
    } catch (error) {
      console.error(`Failed to delete menu item with ID ${id}`, error);
    }
  }

  /**
   * Method to get all menu items
   * @returns Observable of menu items
   */
  getMenuItems(): Observable<IMenuItem[]> {
    if (!this.menuItemsCache$) {
      this.menuItemsCache$ = from(liveQuery(() => db.menuItems.toArray()));
    }
    return this.menuItemsCache$.pipe(
      map((items) => items.map((item) => ({ ...item, isSelected: !!item.isSelected}))),
      tap((items) => {
        this.items = items;
        this.selectedMenuItems.next(items);
      })
    );
  }

  resetCache() {
    this.menuItemsCache$ = undefined;
  }

  setSelectedItems(itemName: string, isSelected: boolean) {
    let selectedItemIndex = this.items.findIndex(
      (item) => item.english_name == itemName
    );
    this.items[selectedItemIndex]['isSelected'] = isSelected;
    this.selectedMenuItems.next(this.items);
  }

  resetSelectedItems() {
    this.items = this.items.map(
      (item) => (item = { ...item, isSelected: false })
    );
    this.selectedMenuItems.next(this.items);
  }
}
