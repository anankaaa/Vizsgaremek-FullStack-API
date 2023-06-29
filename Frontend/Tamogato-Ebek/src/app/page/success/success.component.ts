import { Component, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from 'src/app/model/success';
import { SuccessService } from 'src/app/service/success.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent {
  @Output() successes: Success[] | null = null;
  @Output() success: Success = new Success();

  successList$: Observable<Success[]> = this.successService.getAll();

  @Input() pageSize: number = 7;
  currentPage: number = 1;
  pageNumberState: boolean = false;
  pageCount: number = 0;

  constructor(private successService: SuccessService) {}

  getPageNumbers(): number[] {
    if (!this.pageNumberState) {
      this.successList$.subscribe((success) => {
        this.successes = success;
      });
      this.pageNumberState = true;
    }
    if (this.pageSize != 0 && this.successes != null) {
      this.pageCount = Math.ceil(this.successes!.length / this.pageSize);
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
