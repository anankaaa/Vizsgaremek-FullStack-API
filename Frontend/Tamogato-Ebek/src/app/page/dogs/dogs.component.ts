import { Component, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from 'src/app/model/dog';
import { DogService } from 'src/app/service/dog.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
})
export class DogsComponent<T extends { [x: string]: any }> {
  @Output() dogs: Dog[] | null = null;
  @Output() dog: Dog = new Dog();
  dogList$: Observable<Dog[]> = this.dogService.getAll();

  @Input() pageSize: number = 8;
  currentPage: number = 1;
  pageNumberState: boolean = false;
  pageCount: number = 0;

  constructor(private dogService: DogService) {}

  getPageNumbers(): number[] {
    if (!this.pageNumberState) {
      this.dogList$.subscribe((dog) => {
        this.dogs = dog;
      });
      this.pageNumberState = true;
    }
    if (this.pageSize != 0 && this.dogs != null) {
      this.pageCount = Math.ceil(this.dogs!.length / this.pageSize);
      let nums: number[] = [];
      for (let i = 0; i < this.pageCount; i++) {
        nums[i] = i + 1;
      }

      return nums;
    } else {
      return [];
    }
  }

  jumpToPage(pageNum: number): void {
    this.currentPage = pageNum;
  }

  jumpPrevious() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
  }

  jumpNext() {
    console.log(this.currentPage, this.pageCount);
    if (this.currentPage < this.pageCount - 1) {
      this.currentPage = this.currentPage + 1;
    }
  }
}
