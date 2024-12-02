import { Routes } from '@angular/router';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { TrackingPageComponent } from './pages/tracking-page/tracking-page.component';
import { PAGES } from './defines/defines';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { PaidPageComponent } from './pages/paid-page/paid-page.component';
import { PostponedPageComponent } from './pages/postponed-page/postponed-page.component';
import { CancelledPageComponent } from './pages/cancelled-page/cancelled-page.component';

export const routes: Routes = [
  { path: PAGES.MENU, component: MenuPageComponent},
  { path: '', redirectTo: `/${PAGES.MENU}`, pathMatch: 'full' },
  { path: `${PAGES.EDIT}/:orderId`, component: EditPageComponent},
  { path: PAGES.ORDERS, component: OrdersPageComponent },
  { path: PAGES.TRACKING, component: TrackingPageComponent },
  { path: PAGES.PAID, component: PaidPageComponent },
  { path: PAGES.POSTPONED, component: PostponedPageComponent },
  { path: PAGES.CANCELLED, component: CancelledPageComponent },
  { path: '**', redirectTo: '/' },
];
