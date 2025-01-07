import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { db } from '../indexedDB/order-database';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private backendUrl = 'https://your-backend.com/api/orders';

  constructor(private http: HttpClient) {}

  async syncOrders(): Promise<void> {
    // Fetch unsynced orders
    const unsyncedOrders = await db.orders
      .where('synced')
      .equals('false')
      .toArray();

    // Push unsynced orders to the backend
    for (const order of unsyncedOrders) {
      await this.syncOrderToServer(order);
    }

    // Fetch updates from the server
    const lastSync = await db.orders.orderBy('lastUpdated').last();
    const lastUpdated = lastSync?.lastUpdated || new Date(0);

    try {
      const updatedOrders = await this.http
        .get<IOrder[]>(`${this.backendUrl}?lastUpdated=${lastUpdated}`)
        .toPromise();
      if (updatedOrders) {
        for (const serverOrder of updatedOrders) {
          await this.resolveConflict(serverOrder);
        }
      }
    } catch (error) {
      console.error('Error fetching updates from the server:', error);
    }
  }

  private async syncOrderToServer(order: IOrder): Promise<void> {
    try {
      await this.http.post(`${this.backendUrl}`, order).toPromise();
      order.synced = true;
      order.lastUpdated = new Date();
      await db.orders.put(order);
    } catch (error) {
      console.error('Failed to sync order:', order.orderId, error);
    }
  }

  private async resolveConflict(serverOrder: IOrder): Promise<void> {
    // Fetch the local version of the order
    const localOrder = await db.orders.get(serverOrder.orderId);

    if (!localOrder) {
      // If no local order exists, add the server order to IndexedDB
      await db.orders.put({ ...serverOrder, synced: true });
      return;
    }

    if (new Date(serverOrder.lastUpdated) > new Date(localOrder.lastUpdated)) {
      // Server version is newer, overwrite the local version
      await db.orders.put({ ...serverOrder, synced: true });
    } else if (
      new Date(serverOrder.lastUpdated) < new Date(localOrder.lastUpdated)
    ) {
      // Local version is newer, push it to the server
      await this.syncOrderToServer(localOrder);
    } else {
      // Timestamps are equal, consider them synchronized
      localOrder.synced = true;
      await db.orders.put(localOrder);
    }
  }
}
