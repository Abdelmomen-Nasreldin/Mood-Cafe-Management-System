import { Component, Input } from '@angular/core';
import { IMenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input({required : true}) item! : IMenuItem;
  @Input() enableOrdering : boolean = false;

  addToOrder(){
    
  }
}
