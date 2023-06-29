import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  userList$: Observable<User[]> = this.userService.getAll();

  columns = this.configService.userTableColumns;

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onEdit(user: User): void {
    this.router.navigate(['/user-editor', user._id]);
  }

  onDelete(user: User): void {
    this.userService
      .delete(user)
      .subscribe(() => (this.userList$ = this.userService.getAll()));
    this.toastr.warning('Felhasználó törölve!', '⚡ WARNING! ⚡');
  }
}
