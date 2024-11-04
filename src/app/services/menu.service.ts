import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenuItems() {
    return [
      { id: 1, name: 'Latte', price: 30 },
      { id: 2, name: 'Espresso', price: 25 },
      { id: 3, name: 'Cappuccino', price: 35 },
    ];
  }
}
