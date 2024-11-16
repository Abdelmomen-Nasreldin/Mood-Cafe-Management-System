import { Injectable } from '@angular/core';
import { IOrder } from '../models/order';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  // Export orders to CSV
  exportOrdersToCSV(orders: IOrder[]): void {
    // Create an object to aggregate items by their name
    const aggregatedItems: { [key: string]: { totalQuantity: number, totalPrice: number } } = {};

    // Loop through all orders and their items
    orders.forEach(order => {
      order.items.forEach(item => {
        // If the item already exists in the aggregatedItems, sum up the quantity and price
        if (aggregatedItems[item.itemEnglishName]) {
          aggregatedItems[item.itemEnglishName].totalQuantity += item.quantity;
          aggregatedItems[item.itemEnglishName].totalPrice += item.total;
        } else {
          // Otherwise, initialize the aggregated item
          aggregatedItems[item.itemEnglishName] = {
            totalQuantity: item.quantity,
            totalPrice: item.total
          };
        }
      });
    });

    // Convert the aggregated items object to an array for CSV export
    const aggregatedData = Object.keys(aggregatedItems).map(itemName => ({
      ItemName: itemName,
      TotalQuantity: aggregatedItems[itemName].totalQuantity,
      TotalPrice: aggregatedItems[itemName].totalPrice
    }));

    // Generate CSV using PapaParse
    const csv = Papa.unparse(aggregatedData);

    // Create a Blob from the CSV string and trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `aggregated_orders_${new Date().toISOString().split('T')[0]}.csv`);
  }

}
