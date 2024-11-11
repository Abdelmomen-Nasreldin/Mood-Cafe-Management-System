import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IOrder, IOrderItem } from '../../models/order';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { calculateItemTotal, calculateOrderTotal } from '../../utils';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-order-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-print.component.html',
  styleUrl: './order-print.component.scss',
})
export class OrderPrintComponent implements OnInit {
  private destroy$ = new Subject<void>();
  @Input({ required: true }) order!: IOrder;
  currentDate = new Date();
  cafeName = 'Moods Cafe';
  isModalOpen = false;

  constructor(private _modalService: ModalService) {}

  ngOnInit(): void {
    this._modalService.modalState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen) => {
        this.isModalOpen = isOpen;
      });
  }

  closeModal() {
    this._modalService.closeModal();
  }

  printReceipt() {
    const printContents = document.querySelector('.receipt')?.innerHTML;

    if (printContents) {
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore the original content
    } else {
      console.error('Receipt content not found!');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
