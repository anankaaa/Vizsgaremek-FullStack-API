import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Success } from 'src/app/model/success';
import { ConfigService } from 'src/app/service/config.service';
import { SuccessService } from 'src/app/service/success.service';

@Component({
  selector: 'app-successes-list',
  templateUrl: './successes-list.component.html',
  styleUrls: ['./successes-list.component.scss'],
})
export class SuccessesListComponent {
  successList$: Observable<Success[]> = this.successService.getAll();

  columns = this.configService.successTableColumns;

  constructor(
    private successService: SuccessService,
    private configService: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onEdit(success: Success): void {
    this.router.navigate(['/success-editor', success._id]);
  }

  onDelete(success: Success): void {
    this.successService
      .delete(success)
      .subscribe(() => (this.successList$ = this.successService.getAll()));
    this.toastr.warning('Megjelenés törölve!', '⚡ WARNING! ⚡');
  }
}
