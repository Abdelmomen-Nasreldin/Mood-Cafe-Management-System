import { Injectable } from "@angular/core";
import { IOrder } from "../models/order";
import * as Papa from "papaparse";
import { saveAs } from "file-saver-es";

@Injectable({
  providedIn: "root",
})
export class ExportService {
  // Export orders to CSV
  exportOrdersToCSV(orders: IOrder[]): void {
    // Create an object to aggregate items by their English name
    const aggregatedItems: { [key: string]: { totalQuantity: number; totalPrice: number; itemName: string } } = {};

    // Loop through all orders and their items
    orders.forEach((order) => {
      order.items.forEach((item) => {
        // If the item already exists in the aggregatedItems, sum up the quantity and price
        if (aggregatedItems[item.itemEnglishName]) {
          aggregatedItems[item.itemEnglishName].totalQuantity += item.quantity;
          aggregatedItems[item.itemEnglishName].totalPrice += item.total;
        } else {
          // Otherwise, initialize the aggregated item
          aggregatedItems[item.itemEnglishName] = {
            totalQuantity: item.quantity,
            totalPrice: item.total,
            itemName: item.itemName, // Store both itemName and itemEnglishName
          };
        }
      });
    });

    // Convert the aggregated items object to an array for CSV export
    const aggregatedData = Object.keys(aggregatedItems).map((itemEnglishName) => ({
      ItemName: aggregatedItems[itemEnglishName].itemName, // Original item name
      ItemEnglishName: itemEnglishName, // English name of the item
      TotalQuantity: aggregatedItems[itemEnglishName].totalQuantity,
      TotalPrice: aggregatedItems[itemEnglishName].totalPrice,
    }));

    // Generate CSV using PapaParse
    const csv = Papa.unparse(aggregatedData);

    // Create a Blob from the CSV string and trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `aggregated_orders_${new Date().toISOString().split("T")[0]}.csv`);
  }
}
