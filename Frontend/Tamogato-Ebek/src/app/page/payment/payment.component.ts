import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, of } from 'rxjs';
import { Aid } from 'src/app/model/aid';
import { AidService } from 'src/app/service/aid.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  aid$: Observable<Aid> = this.activatedRoute.params.pipe(
    switchMap((params) =>
      params['id'] != 0 ? this.aidService.get(params['id']) : of(new Aid())
    )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private aidService: AidService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(eventForm: NgForm, aid: Aid): void {
    if (!aid._id) {
      return;
    }

    this.aidService
      .update(aid)
      .subscribe((aid) => this.router.navigate(['/aid']));
  }

  showToaster() {
    this.toastr.success('Köszönjük támogatását');
  }
}
