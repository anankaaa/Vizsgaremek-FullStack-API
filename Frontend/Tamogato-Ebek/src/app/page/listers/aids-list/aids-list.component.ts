import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Aid } from 'src/app/model/aid';
import { AidService } from 'src/app/service/aid.service';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-aids-list',
  templateUrl: './aids-list.component.html',
  styleUrls: ['./aids-list.component.scss'],
})
export class AidsListComponent {
  aidList$: Observable<Aid[]> = this.aidService.getAll();

  columns = this.configService.aidTableColumns;

  constructor(
    private aidService: AidService,
    private configService: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onEdit(aid: Aid): void {
    this.router.navigate(['/aid-editor', aid._id]);
  }

  onDelete(aid: Aid): void {
    this.aidService
      .delete(aid)
      .subscribe(() => (this.aidList$ = this.aidService.getAll()));
    this.toastr.warning('Támogatás törölve!', '⚡ WARNING! ⚡');
  }
}
