import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Aid } from 'src/app/model/aid';

@Component({
  selector: 'app-aid-card',
  templateUrl: './aid-card.component.html',
  styleUrls: ['./aid-card.component.scss'],
})
export class AidCardComponent {
  @Input() aid: Aid = new Aid();

  @Output() onEdit: EventEmitter<Aid> = new EventEmitter();

  constructor(private router: Router) {}

  raiseEdit(aid: Aid): void {
    this.router.navigate(['/aid', aid._id]);
  }

  translate() {
    return this.aid.active === true ? 'igen' : 'nem';
  }
}
