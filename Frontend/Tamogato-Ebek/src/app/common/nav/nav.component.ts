import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  user!: User;
  constructor(private auth: AuthService, private router: Router) {
    auth.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  onLogout() {
    this.auth.logout();

    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  get isAuth() {
    return this.user._id !== '';
  }
}
