import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';

@Component({
  selector: 'app-tracking-page',
  standalone: true,
  imports: [],
  templateUrl: './tracking-page.component.html',
  styleUrl: './tracking-page.component.scss'
})
export class TrackingPageComponent implements OnInit {
constructor(private _trackingService : TrackingService){

}
  ngOnInit(): void {
    console.log(this._trackingService.getTodayOrdersFrom7AM());

   this._trackingService.getWeeklyOrders()
  }


}
