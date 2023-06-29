import { Component, Input } from '@angular/core';
import { Success } from 'src/app/model/success';

@Component({
  selector: 'app-success-card',
  templateUrl: './success-card.component.html',
  styleUrls: ['./success-card.component.scss'],
})
export class SuccessCardComponent {
  @Input() success: Success = new Success();
  @Input() target!: number;
}
