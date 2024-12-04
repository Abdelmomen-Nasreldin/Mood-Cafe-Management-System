import { Injectable } from "@angular/core";
import { isWithinInterval } from "date-fns"; // Use date-fns for easy date handling
import { IOrder } from "../models/order";
import { TRACKING_PERIODS } from "../defines/defines";

// Constants for time intervals
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;
@Injectable({
  providedIn: "root",
})
export class TrackingService {
  constructor() {}

  // Helper function to get filtered orders between a date range
  private getOrdersWithinRange(orders: IOrder[], startDate: Date, endDate: Date): IOrder[] {
    // const orders = this._orderService.getOrders();
    return orders.filter((order) => isWithinInterval(new Date(order.date), { start: startDate, end: endDate }));
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
  private getOrdersWithinDays(orders: IOrder[], daysAgo: number): IOrder[] {
    const today = new Date();

    // Calculate the start date `daysAgo` with time set to 7 AM
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo, 7, 0, 0);

    // const orders = this._orderService.getOrders();

    return orders.filter((order) => isWithinInterval(new Date(order.date), { start: startDate, end: today }));
  }

  // Get orders from the last week
  getWeeklyOrders(orders: IOrder[]): IOrder[] {
    return this.getOrdersWithinDays(orders, DAYS_IN_WEEK);
  }

  // Get orders from the last month
  getMonthlyOrders(orders: IOrder[]): IOrder[] {
    return this.getOrdersWithinDays(orders, DAYS_IN_MONTH);
  }

  // Get orders for today starting from 7 AM
  getTodayOrdersFrom7AM(orders: IOrder[]): IOrder[] {
    const startHour = 7;
    const today = new Date();
    const now = new Date(); // Current time
    // Create a new Date object for today with the custom start hour
    let customStartTime: Date;
    if (now.getHours() <= 6) {
      customStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, startHour, 0, 0);
    } else {
      customStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, 0, 0);
    }
    return this.getOrdersWithinRange(orders, customStartTime, now);
  }

  getTodayOrdersFromCustomTime(orders: IOrder[], startHour: number): IOrder[] {
    const today = new Date();
    const now = new Date(); // Current time
    // Create a new Date object for today with the custom start hour
    let customStartTime: Date;
    if (now.getHours() <= 6) {
      customStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, startHour, 0, 0);
    } else {
      customStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, 0, 0);
    }

    // console.log(today);
    // console.log(now);
    // console.log(customStartTime);

    return this.getOrdersWithinRange(orders, customStartTime, now);
  }

  // the orders from the 1st day of the current month at 7 AM
  getOrdersFromStartOfMonthAt7AM(orders: IOrder[]): IOrder[] {
    const today = new Date();
    // Set the start of the month to the 1st day of the current month at 7 AM
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 7, 0, 0); // 1st day of the month at 7 AM
    const now = new Date(); // Current time

    return this.getOrdersWithinRange(orders, startOfMonth, now);
  }

  // getOrdersForSpecificDayAt7AM(date: Date): IOrder[] {
  //   // Set the start time of the specific day to 7 AM

  //   const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0);

  //   // Set the end time to 6:59:59 AM of the next day (just before 7 AM)
  //   const endOfDay = new Date(addDays(startOfDay, 1).getTime() - 1);

  //   const orders = this._orderService.getOrders();

  //   return orders.filter((order) =>
  //     isWithinInterval(new Date(order.date), { start: startOfDay, end: endOfDay })
  //   );
  // }
  getOrdersForSpecificDayAt7AM(orders: IOrder[], date: Date): IOrder[] {
    // Set the start time of the specific day to 7 AM
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0);

    // Set the end time to 6:59:59 AM of the next day (just before 7 AM)
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1); // Move to the next day
    endOfDay.setMilliseconds(endOfDay.getMilliseconds() - 1); // Set to 6:59:59.999 AM

    // const orders = this._orderService.getOrders();

    // Filter orders where the order date is within the specified interval
    return orders.filter((order) => {
      // Ensure that order.date is a Date object if it's not already
      const orderDate = new Date(order.date);
      return isWithinInterval(orderDate, { start: startOfDay, end: endOfDay });
    });
  }

  getOrdersByPeriod(orders: IOrder[], period: string, selectedDate?: string, secondSelectedDate?: string): IOrder[] {
    switch (period) {
      case TRACKING_PERIODS.FROM_1ST_OF_MONTH:
        return this.getOrdersFromStartOfMonthAt7AM(orders);
      case TRACKING_PERIODS.LAST_30_DAYS:
        return this.getOrdersWithinDays(orders, DAYS_IN_MONTH);
      case TRACKING_PERIODS.LAST_7_DAYS:
        return this.getOrdersWithinDays(orders, DAYS_IN_WEEK);
      case TRACKING_PERIODS.CUSTOM_DAY:
        if (selectedDate) {
          return this.getOrdersForSpecificDayAt7AM(orders, new Date(selectedDate));
        }
        break;
      case TRACKING_PERIODS.FROM_CUSTOM_DATE_TO_DATE:
        if (selectedDate && secondSelectedDate) {
          return this.getOrdersWithinRange(orders, new Date(selectedDate), new Date(secondSelectedDate));
        }
        break;
      default:
        return [];
    }
    return [];
  }
}
