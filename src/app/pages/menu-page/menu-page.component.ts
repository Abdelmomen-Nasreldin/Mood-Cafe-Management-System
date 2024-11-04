import { Component, OnInit } from '@angular/core';
import { MenuItemComponent } from "../../components/menu-item/menu-item.component";
import { MenuService } from '../../services/menu.service';
import { IMenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss'
})
export class MenuPageComponent implements OnInit {

  menuItems : IMenuItem[] = []
  constructor(private _menuService : MenuService){
  }
  ngOnInit(): void {
    this.menuItems = this._menuService.getMenuItems();
  }


}
