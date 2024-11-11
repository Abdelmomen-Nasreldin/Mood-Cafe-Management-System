// modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStateSource = new BehaviorSubject<boolean>(false);
  modalState$ = this.modalStateSource.asObservable();

  openModal() {
    this.modalStateSource.next(true);
  }

  closeModal() {
    this.modalStateSource.next(false);
  }
}
