import { Component, Input } from '@angular/core';
import { Dog } from 'src/app/model/dog';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
})
export class DogCardComponent<T extends { [x: string]: any }> {
  @Input() dog: Dog = new Dog();
  @Input() listers: T[] = [];

  page: number = 1;

  translate(value: Boolean) {
    return value === true ? 'igen' : 'nem';
  }
}
