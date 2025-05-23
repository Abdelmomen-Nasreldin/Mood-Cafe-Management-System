import { Routes } from '@angular/router';
import { PAGES } from './defines/defines';
import { AuthGuard } from './guards/auth.guard';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { TrackingPageComponent } from './pages/tracking-page/tracking-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { PaidPageComponent } from './pages/paid-page/paid-page.component';
import { PostponedPageComponent } from './pages/postponed-page/postponed-page.component';
import { CancelledPageComponent } from './pages/cancelled-page/cancelled-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ControllingPageComponent } from './pages/controlling-page/controlling-page.component';
import { managerGuard } from './guards/manager.guard';

// it's an offline based app, and I want all the app to be rendered at the first time. that's why no need for lazy loading. (for now)
export const routes: Routes = [
  { path: PAGES.MENU, component: MenuPageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: `/${PAGES.MENU}`, pathMatch: 'full' },
  { path: `${PAGES.EDIT}/:orderId`, component: EditPageComponent, canActivate: [AuthGuard] },
  { path: PAGES.LOGIN, component: LoginComponent },
  { path: PAGES.ORDERS, component: OrdersPageComponent, canActivate: [AuthGuard] },
  { path: PAGES.TRACKING, component: TrackingPageComponent, canActivate: [AuthGuard] },
  { path: PAGES.PAID, component: PaidPageComponent, canActivate: [AuthGuard] },
  { path: PAGES.POSTPONED, component: PostponedPageComponent, canActivate: [AuthGuard] },
  { path: PAGES.CANCELLED, component: CancelledPageComponent, canActivate: [AuthGuard] },
  {path: PAGES.CONTROLLING, component: ControllingPageComponent, canActivate: [AuthGuard,managerGuard] },
  { path: '**', redirectTo: PAGES.LOGIN },
];



