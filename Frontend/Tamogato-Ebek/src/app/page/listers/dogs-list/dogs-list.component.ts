import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Dog } from 'src/app/model/dog';
import { ConfigService } from 'src/app/service/config.service';
import { DogService } from 'src/app/service/dog.service';

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.scss'],
})
export class DogsListComponent {
  dogList$: Observable<Dog[]> = this.dogService.getAll();

  columns = this.configService.dogTableColumns;

  constructor(
    private dogService: DogService,
    private configService: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onEdit(dog: Dog): void {
    this.router.navigate(['/dog-editor', dog._id]);
  }

  onDelete(dog: Dog): void {
    this.dogService
      .delete(dog)
      .subscribe(() => (this.dogList$ = this.dogService.getAll()));
    this.toastr.warning('Kutya törölve!', '⚡ WARNING! ⚡');
  }
}
