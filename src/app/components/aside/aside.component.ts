import { Component } from '@angular/core';
import { PAGES } from '../../defines/defines';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  pages = [
    {
      name: 'menu',
      path: PAGES.MENU
    },
    {
      name: 'orders',
      path: PAGES.ORDERS
    },
    {
      name: 'tracking',
      path: PAGES.TRACKING
    }
  ]
}
