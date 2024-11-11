import { IOrder, IOrderItem } from './models/order';

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


