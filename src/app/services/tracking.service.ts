import { Injectable } from '@angular/core';
import { subDays, isWithinInterval, addDays } from 'date-fns'; // Use date-fns for easy date handling
import { OrderService } from './order.service';
import { IOrder } from '../models/order';
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;
@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private _orderService: OrderService) { }
  // Constants for time intervals

  // Helper function to get filtered orders between a date range
  private getOrdersWithinRange(startDate: Date, endDate: Date): IOrder[] {
    const orders = this._orderService.getOrders();
    return orders.filter((order) =>
      isWithinInterval(new Date(order.date), { start: startDate, end: endDate })
    );
  }
  // Helper function to get filtered orders by date range
  // private getOrdersWithinDays(daysAgo: number): IOrder[] {
  //   const today = new Date();
  //   const startDate = subDays(today, daysAgo);
  //   const orders = this._orderService.getOrders();

  //   return orders.filter((order) =>
  //     isWithinInterval(new Date(order.date), { start: startDate, end: today })
  //   );
  // }
// Helper function to get filtered orders by date range at 7 AM
  private getOrdersWithinDays(daysAgo: number): IOrder[] {
    const today = new Date();

    // Calculate the start date `daysAgo` with time set to 7 AM
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo, 7, 0, 0);

    const orders = this._orderService.getOrders();

    return orders.filter((order) =>
      isWithinInterval(new Date(order.date), { start: startDate, end: today })
    );
  }

  // Get orders from the last week
  getWeeklyOrders(): IOrder[] {
    return this.getOrdersWithinDays(DAYS_IN_WEEK);
  }

  // Get orders from the last month
  getMonthlyOrders(): IOrder[] {
    return this.getOrdersWithinDays(DAYS_IN_MONTH);
  }

  // Get orders for today starting from 7 AM
  getTodayOrdersFrom7AM(): IOrder[] {
    const today = new Date();
    const customStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0, 0); // Today at 7 AM
    const now = new Date(); // Current time

    return this.getOrdersWithinRange(customStartTime, now);
  }

  getTodayOrdersFromCustomTime(startHour: number): IOrder[] {
    const today = new Date();
    // Create a new Date object for today with the custom start hour
    const customStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, 0, 0);
    const now = new Date(); // Current time

    return this.getOrdersWithinRange(customStartTime, now);
  }

  // the orders from the 1st day of the current month at 7 AM
  getOrdersFromStartOfMonthAt7AM(): IOrder[] {
    const today = new Date();
    // Set the start of the month to the 1st day of the current month at 7 AM
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 7, 0, 0); // 1st day of the month at 7 AM
    const now = new Date(); // Current time

    return this.getOrdersWithinRange(startOfMonth, now);
  }

  getOrdersForSpecificDayAt7AM(date: Date): IOrder[] {
    // Set the start time of the specific day to 7 AM
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0);

    // Set the end time to 6:59:59 AM of the next day (just before 7 AM)
    const endOfDay = new Date(addDays(startOfDay, 1).getTime() - 1);

    const orders = this._orderService.getOrders();

    return orders.filter((order) =>
      isWithinInterval(new Date(order.date), { start: startOfDay, end: endOfDay })
    );
  }
  
}






// tracking orders //////////////////////////////////////////////////////
// getWeeklyOrders() {
//   const today = new Date();
//   const weekAgo = subDays(today, 7);
//   const orders = this._orderService.getOrders();
//   return orders.filter((order) =>
//     isWithinInterval(new Date(order.date), { start: weekAgo, end: today })
//   );
// }

// getMonthlyOrders() {
//   const today = new Date();
//   const monthAgo = subDays(today, 30);
//   const orders = this._orderService.getOrders();
//   return orders.filter((order) =>
//     isWithinInterval(new Date(order.date), { start: monthAgo, end: today })
//   );
// }
