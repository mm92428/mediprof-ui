import { ContactsComponent } from '../admin/contacts/contacts.component';
import { AppointmentComponent } from './../pages/appointment/appointment.component';
import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { authGuard } from '../guard/auth/auth.guard';
import { roleGuard } from '../guard/role/role.guard';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { UserComponent } from '../pages/user/user.component';
import { UsersComponent } from '../admin/users/users.component';
import { navigationGuard } from '../guard/navigation/navigation.guard';
import { ServicesComponent } from '../pages/services/services.component';
import { DoctorsComponent } from '../pages/doctors/doctors.component';
import { DepartmentsComponent } from '../pages/departments/departments.component';
import { AboutComponent } from '../pages/about/about.component';
import { ReplyMessageComponent } from '../components/modals/message/reply-message.component';

export const route: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'services', component: ServicesComponent, title: 'Service' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'reply-modal', component: ReplyMessageComponent, title: 'Reply' },
  {
    path: 'departments',
    component: DepartmentsComponent,
    title: 'Departments',
  },
  { path: 'doctors', component: DoctorsComponent, title: 'Doctors' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [navigationGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'SignUp',
    canActivate: [navigationGuard],
  },
  { path: 'contact', component: ContactComponent, title: 'Contact Us' },
  {
    path: 'appointment',
    component: AppointmentComponent,
    title: 'Book Appointment',
  },
  {
    path: 'user/:userId',
    component: UserComponent,
    title: 'User',
    canActivate: [authGuard],
  },
  {
    path: 'admin/contacts',
    component: ContactsComponent,
    canActivate: [authGuard, roleGuard],
    title: 'Contacts',
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [authGuard, roleGuard],
    title: 'Users',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
