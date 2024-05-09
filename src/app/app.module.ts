import { ReplyMessageComponent } from './components/modals/message/reply-message.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './routes/app.routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { ContactsComponent } from './admin/contacts/contacts.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TitleStrategy } from '@angular/router';
import { TemplatePageTitleStrategy } from './extension/title.strategy';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './admin/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { JwtTokenInterceptor } from './extension/http.interceptor';
import { TruncatePipe } from './pipes/truncate-string';
import { MatTableModule } from '@angular/material/table';
import { ServicesComponent } from './pages/services/services.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { CountsComponent } from './components/counts/counts.component';
import { AboutComponent } from './pages/about/about.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { DeleteContactComponent } from './components/modals/delete-contact/delete-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    ContactComponent,
    HomeComponent,
    AppointmentComponent,
    ContactsComponent,
    LoginComponent,
    SignupComponent,
    ReplyMessageComponent,
    UsersComponent,
    UserComponent,
    TruncatePipe,
    ServicesComponent,
    DepartmentsComponent,
    DoctorsComponent,
    GalleryComponent,
    FaqsComponent,
    CountsComponent,
    AboutComponent,
    WhyUsComponent,
    DeleteContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
