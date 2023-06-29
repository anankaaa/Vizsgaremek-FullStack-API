import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user!: User;
  loginForm!: FormGroup;
  alert!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  onSubmit() {
    const personLog = this.loginForm.value;
    this.authService.login(personLog).subscribe({
      next: (user) => {
        console.log(user);
        this.router.navigate(['aid']);
        this.toastr.success(`Üdvözlünk az oldalon! Sikeresen beléptél.`);
      },
      error: (err: string) => {
        this.alert = err;
      },
    });
  }
}
