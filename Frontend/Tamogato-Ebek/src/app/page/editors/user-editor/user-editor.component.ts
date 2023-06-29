import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent {
  user$: Observable<User> = this.activatedRoute.params.pipe(
    switchMap((params) =>
      params['id'] != '0' ? this.userService.get(params['id']) : of(new User())
    )
  );

  user: User = new User();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onUpdate(eventForm: NgForm, user: User): void {
    if (!user._id) {
      this.userService
        .create(user)
        .subscribe((user) => this.router.navigate(['/users']));
    }
    this.userService
      .update(user)
      .subscribe((user) => this.router.navigate(['/users']));
  }

  showToaster() {
    this.toastr.success('Sikeresen elmentve!');
  }
}
