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
    try {
      // Fetch unsynced orders
      const unsyncedOrders = await this.getUnsyncedOrders();

      // Push unsynced orders to the backend
      await this.postOrdersToServer(unsyncedOrders);

      // Fetch updates from the server
      const lastSync = await this.getLastSync();
      const lastUpdated = new Date(lastSync?.lastUpdated || 0);

      const updatedOrders = await this.getUpdatedOrdersFromServer(lastUpdated);

      // Resolve conflicts
      await this.resolveConflicts(updatedOrders);
    } catch (error) {
      console.error('Error syncing orders:', error);
    }
  }

  private async getUnsyncedOrders(): Promise<IOrder[]> {
    return await db.orders
      .where('synced')
      .equals('false')
      .toArray();
  }

  private async getLastSync(): Promise<IOrder | undefined> {
    return await db.orders.orderBy('lastUpdated').last();
  }

  private async getUpdatedOrdersFromServer(lastUpdated: Date): Promise<IOrder[]> {
    try {
      const response = await this.http
        .get<IOrder[]>(`${this.backendUrl}?lastUpdated=${lastUpdated}`)
        .toPromise();
      return response || [];
    } catch (error) {
      console.error('Error fetching updates from the server:', error);
      throw error;
    }
  }

  private async postOrdersToServer(orders: IOrder[]): Promise<void> {
    try {
      await this.http.post<IOrder[]>(this.backendUrl, orders).toPromise();
      const syncedOrders = orders.map((order) => ({ ...order, synced: true, lastUpdated: new Date().getTime() }));
      await db.orders.bulkPut(syncedOrders);
    } catch (error) {
      console.error(`Failed to post orders to server: ${error}`);
      throw error;
    }
  }

  private async resolveConflicts(updatedOrders: IOrder[]): Promise<void> {
    for (const serverOrder of updatedOrders) {
      // Fetch the local version of the order
      const localOrder = await db.orders.get(serverOrder.orderId);

      if (!localOrder) {
        // If no local order exists, add the server order to IndexedDB
        await db.orders.put({ ...serverOrder, synced: true });
        continue;
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

  private async syncOrderToServer(localOrder: IOrder): Promise<void> {
    try {
      await this.http.put<IOrder>(`${this.backendUrl}/${localOrder.orderId}`, localOrder).toPromise();
      localOrder.synced = true;
      await db.orders.put(localOrder);
    } catch (error) {
      console.error(`Failed to sync order to server: ${error}`);
      throw error;
    }
  }
}
