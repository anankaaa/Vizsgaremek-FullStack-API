import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  user!: User;
  constructor(private auth: AuthService, private router: Router) {
    auth.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }
}
