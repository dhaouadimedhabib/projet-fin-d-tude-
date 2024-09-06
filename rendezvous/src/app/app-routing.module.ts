import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListerendezvousComponent } from './listerendezvous/listerendezvous.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.component';
import { PlanificationComponent } from './planification/planification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ServicesComponent } from './services/services.component';
import { UpdateprofilComponent } from './updateprofil/updateprofil.component';
import { PayementComponent } from './payement/payement.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'listerdv', component: ListerendezvousComponent },
  { path: 'client', component: ClientComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dashbord', component: DashbordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation/:id', component: ReservationComponent },
  { path: 'plan', component: PlanificationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'service', component: ServicesComponent },
  { path: 'update', component: UpdateprofilComponent },
  { path: 'paiement/:rendezVousId', component: PayementComponent },
  { path: 'signin', component: GoogleSigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
