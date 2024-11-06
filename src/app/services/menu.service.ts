import { Injectable } from '@angular/core';
import { IMenuItem } from '../models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenuItems() : IMenuItem[] {
    return [
      { id: 1, name: 'لاتيه', price: 30 },
      { id: 2, name: 'اسبرسو', price: 25 },
      { id: 3, name: 'كابتشينو', price: 35 },
      { id: 4, name: 'شاي', price: 9 },
      { id: 5, name: 'قهوة', price: 18 },
      { id: 6, name: ' قهوة فرنساوي', price: 25 },
    ];
  }
}
