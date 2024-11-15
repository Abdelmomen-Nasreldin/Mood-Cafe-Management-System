import { Routes } from '@angular/router';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { TrackingPageComponent } from './pages/tracking-page/tracking-page.component';
import { PAGES } from './defines/defines';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

export const routes: Routes = [
  { path: PAGES.MENU, component: MenuPageComponent},
  { path: '', redirectTo: `/${PAGES.MENU}`, pathMatch: 'full' },
  { path: `${PAGES.EDIT}/:orderId`, component: EditPageComponent},
  { path: PAGES.ORDERS, component: OrdersPageComponent },
  { path: PAGES.TRACKING, component: TrackingPageComponent },
  { path: '**', redirectTo: '/' },
];
