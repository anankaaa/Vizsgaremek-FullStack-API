import { Component, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Aid } from 'src/app/model/aid';
import { AidService } from 'src/app/service/aid.service';

@Component({
  selector: 'app-aid',
  templateUrl: './aid.component.html',
  styleUrls: ['./aid.component.scss'],
})
export class AidComponent {
  aidList$: Observable<Aid[]> = this.aidService.getAll();

  @Output() aids: Aid[] | null = null;
  @Output() aid: Aid = new Aid();

  constructor(private aidService: AidService) {}

  @Input() pageSize: number = 4;
  currentPage: number = 1;
  pageNumberState: boolean = false;
  pageCount: number = 0;

  getPageNumbers(): number[] {
    if (!this.pageNumberState) {
      this.aidList$.subscribe((aid) => {
        this.aids = aid;
      });
      this.pageNumberState = true;
    }
    if (this.pageSize != 0 && this.aids != null) {
      this.pageCount = Math.ceil(this.aids!.length / this.pageSize);
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
