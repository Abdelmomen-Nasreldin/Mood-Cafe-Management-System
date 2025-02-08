import { TRACKING_PERIODS } from './defines/defines';
import { IOrder, IOrderItem } from './models/order';
import { subDays, startOfMonth } from 'date-fns';

export function calculateItemTotal(item: IOrderItem): number {
  return item.price * item.quantity;
}

export function calculateOrderTotal(items: IOrderItem[] | IOrder[]): number {
  return items.reduce((total, item) => total + item.total, 0);
}

export function calculateOrderItemQuantity(items: IOrder[]): Record<string, number> {
  return items.reduce((acc, order) => {
    order.items.forEach((item) => {
      if (acc[item.itemName]) {
        acc[item.itemName] += item.quantity;
      } else {
        acc[item.itemName] = item.quantity;
      }
    });
    return acc;
  }, {} as Record<string, number>);
}

export function sortObjectByValues(obj: Record<string, number>) {
  return Object.entries(obj)
    .sort(([, valueA], [, valueB]) => valueA - valueB)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);
}

export function filterOrders(orders: IOrder[], searchTerm: string): IOrder[] {
  if (!orders || !searchTerm) {
    return orders;
  }

  // Normalize the search term and customer names for case-insensitive matching
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  return orders.filter(order =>
    order.customerName?.toLowerCase().includes(normalizedSearchTerm)
  );
}

// src/app/utils/utils.ts

export function sortOrders(orders: IOrder[], selectedOrder: string): IOrder[] {
  if (!orders) return []; // Handle empty or undefined orders array

  return orders.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (selectedOrder === 'new') {
      return dateB - dateA;  // Sort descending (newest first)
    } else {
      return dateA - dateB;  // Sort ascending (oldest first)
    }
  });
}

export const setDates = (period: string, selectedDate: string, secondSelectedDate: string) => {
    if (period === TRACKING_PERIODS.FROM_1ST_OF_MONTH) {
      selectedDate = startOfMonth(new Date()).toString();
      secondSelectedDate = new Date().toString();
    } else if (period === TRACKING_PERIODS.LAST_7_DAYS) {
      selectedDate = subDays(new Date(), 6).toString();
      secondSelectedDate = new Date().toString();
    } else if (period === TRACKING_PERIODS.LAST_30_DAYS) {
      selectedDate = subDays(new Date(), 30).toString();
      secondSelectedDate = new Date().toString();
    } else if (period === TRACKING_PERIODS.TODAY) {
      const today = new Date();
      let customStartTime = new Date();
      if (today.getHours() <= 6) {
        customStartTime.setDate(customStartTime.getDate() - 1);
      }
      selectedDate = customStartTime.toString();
    }
    return { selectedDate, secondSelectedDate };
  }

// export function printReceipt() {
//   const printContents = document.querySelector('.receipt')?.innerHTML;

//   if (printContents) {
//     const originalContents = document.body.innerHTML;

//     document.body.innerHTML = printContents;
//     window.print();
//     document.body.innerHTML = originalContents;
//     window.location.reload(); // Reload to restore the original content
//   } else {
//     console.error('Receipt content not found!');
//   }
// }


