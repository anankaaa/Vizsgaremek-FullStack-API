import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './page/payment/payment.component';
import { AidComponent } from './page/aid/aid.component';
import { DogsComponent } from './page/dogs/dogs.component';
import { UserEditorComponent } from './page/editors/user-editor/user-editor.component';
import { HomeComponent } from './page/home/home.component';
import { SuccessComponent } from './page/success/success.component';
import { UsersComponent } from './page/users/users.component';

import { DogsListComponent } from './page/listers/dogs-list/dogs-list.component';
import { AidsListComponent } from './page/listers/aids-list/aids-list.component';
import { SuccessesListComponent } from './page/listers/successes-list/successes-list.component';
import { LoginComponent } from './page/login/login.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { RoleGuardService } from './guard/role-guard.service';
import { MyProfileComponent } from './page/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dogs',
    component: DogsComponent,
  },
  {
    path: 'aid',
    component: AidComponent,
  },
  {
    path: 'aid/:id',
    component: PaymentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
  },
  {
    path: 'user-editor/:id',
    component: UserEditorComponent,
  },
  {
    path: 'dogs-list',
    component: DogsListComponent,
  },

  {
    path: 'aids-list',
    component: AidsListComponent,
  },

  {
    path: 'successes-list',
    component: SuccessesListComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'myprofile',
    component: MyProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
