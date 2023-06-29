import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './common/nav/nav.component';
import { HomeComponent } from './page/home/home.component';
import { DogsComponent } from './page/dogs/dogs.component';
import { AidComponent } from './page/aid/aid.component';
import { DogCardComponent } from './common/dog-card/dog-card.component';

import { AidCardComponent } from './common/aid-card/aid-card.component';
import { SuccessCardComponent } from './common/success-card/success-card.component';
import { SuccessComponent } from './page/success/success.component';

import { UsersComponent } from './page/users/users.component';
import { SorterPipe } from './pipe/sorter.pipe';
import { FilterPipe } from './pipe/filter.pipe';
import { DataTableComponent } from './common/data-table/data-table.component';
import { UserEditorComponent } from './page/editors/user-editor/user-editor.component';
import { PaymentComponent } from './page/payment/payment.component';

import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './common/footer/footer.component';
import { DogsListComponent } from './page/listers/dogs-list/dogs-list.component';
import { AidsListComponent } from './page/listers/aids-list/aids-list.component';
import { SuccessesListComponent } from './page/listers/successes-list/successes-list.component';
import { LoginComponent } from './page/login/login.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { AuthenticationInterceptor } from 'src/interceptors/authentication.interceptors';
import { MyProfileComponent } from './page/my-profile/my-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    DogsComponent,
    AidComponent,
    DogCardComponent,
    AidCardComponent,
    SuccessCardComponent,
    SuccessComponent,

    UsersComponent,
    SorterPipe,
    FilterPipe,
    DataTableComponent,
    UserEditorComponent,
    PaymentComponent,
    FooterComponent,
    DogsListComponent,
    AidsListComponent,
    SuccessesListComponent,
    LoginComponent,
    NotFoundComponent,
    MyProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
