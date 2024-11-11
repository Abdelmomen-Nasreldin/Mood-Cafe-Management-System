import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})

export class DatePickerComponent {
  selectedDate: string = '';  // ISO Date format: YYYY-MM-DD

  @Output() dateChanged = new EventEmitter<string>();

  onDateChange() {
    this.dateChanged.emit(this.selectedDate);  // Emit the selected date
  }
}
