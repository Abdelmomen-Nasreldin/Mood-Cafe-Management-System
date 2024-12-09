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
  private getOrdersWithinRange(orders: IOrder[], startDate: Date, endDate: Date, isPaidPostponed = false): IOrder[] {
    return orders.filter((order) => isWithinInterval(new Date((isPaidPostponed && order.paidDate) ? order.paidDate : order.date), { start: startDate, end: endDate }));
  }

  // Helper function to get filtered orders by date range at 7 AM
  private getOrdersWithinDays(orders: IOrder[], daysAgo: number, isPaidPostponed = false): IOrder[] {
    const today = new Date();
    // Calculate the start date `daysAgo` with time set to 7 AM
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo, 7, 0, 0);
    return orders.filter((order) => isWithinInterval(new Date((isPaidPostponed && order.paidDate) ? order.paidDate : order.date), { start: startDate, end: today }));
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

    return this.getOrdersWithinRange(orders, customStartTime, now);
  }

  // the orders from the 1st day of the current month at 7 AM
  getOrdersFromStartOfMonthAt7AM(orders: IOrder[], isPaidPostponed = false): IOrder[] {
    const today = new Date();
    // Set the start of the month to the 1st day of the current month at 7 AM
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 7, 0, 0); // 1st day of the month at 7 AM
    const now = new Date(); // Current time

    return this.getOrdersWithinRange(orders, startOfMonth, now, isPaidPostponed);
  }

  getOrdersForSpecificDayAt7AM(orders: IOrder[], date: Date, isPaidPostponed = false): IOrder[] {
    // Set the start time of the specific day to 7 AM
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0);

    // Set the end time to 6:59:59 AM of the next day (just before 7 AM)
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1); // Move to the next day
    endOfDay.setMilliseconds(endOfDay.getMilliseconds() - 1); // Set to 6:59:59.999 AM
    // Filter orders where the order date is within the specified interval
    return orders.filter((order) => {
      // Ensure that order.date is a Date object if it's not already
      const orderDate = new Date(isPaidPostponed && order.paidDate ? order.paidDate : order.date);
      return isWithinInterval(orderDate, { start: startOfDay, end: endOfDay });
    });
  }

  getOrdersByPeriod(orders: IOrder[], period: string, startDate?: string, endDate?: string, isPaidPostponed = false): IOrder[] {
    const today = new Date();
    switch (period) {
      case TRACKING_PERIODS.FROM_1ST_OF_MONTH:
        return this.getOrdersFromStartOfMonthAt7AM(orders, isPaidPostponed);
      case TRACKING_PERIODS.LAST_30_DAYS:
        return this.getOrdersWithinDays(orders, DAYS_IN_MONTH, isPaidPostponed);
      case TRACKING_PERIODS.LAST_7_DAYS:
        return this.getOrdersWithinDays(orders, DAYS_IN_WEEK, isPaidPostponed);
      case TRACKING_PERIODS.CUSTOM_DAY:
        if (startDate) {
          return this.getOrdersForSpecificDayAt7AM(orders, new Date(startDate), isPaidPostponed);
        }
        break;
      case TRACKING_PERIODS.FROM_CUSTOM_DATE_TO_DATE:
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          start.setHours(6, 59, 59);
          end.setDate(end.getDate() + 1);
          end.setHours(6, 59, 59);
          return this.getOrdersWithinRange(orders, start, end, isPaidPostponed);
        }
        break;
      default:
        return [];
    }
    return [];
  }
}


// new Date(
//   selectedDate.getFullYear(),
//   selectedDate.getMonth(),
//   selectedDate.getDate() + 1, // Move to the next day
//   6, // Set hours to 6
//   59, // Set minutes to 59
//   59  // Set seconds to 59
// )
