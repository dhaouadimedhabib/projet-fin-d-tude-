import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListerendezvousComponent } from './listerendezvous/listerendezvous.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Service/auth.interceptor';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { MultiSelectModule } from 'primeng/multiselect'; 
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { PlanificationComponent } from './planification/planification.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProfessionnelComponent } from './professionnel/professionnel.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Import the MatNativeDateModule
import { AvatarModule } from 'primeng/avatar';
import { ReservationComponent } from './reservation/reservation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesComponent } from './services/services.component'; // Ajoutez cette ligne
import { CardModule } from 'primeng/card';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateprofilComponent } from './updateprofil/updateprofil.component';
import { MatIconModule } from '@angular/material/icon';
import { PayementComponent } from './payement/payement.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashbordComponent,
    LoginComponent,
    RegisterComponent,
    ListerendezvousComponent,
    AdminComponent,
    ClientComponent,
    HomeComponent,
    PlanificationComponent,
    ProfessionnelComponent,
    ReservationComponent,
    ServicesComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    UpdateprofilComponent,
    PayementComponent,
    GoogleSigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ToastModule ,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    TagModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    ToggleButtonModule,
    SelectButtonModule,
    RadioButtonModule,
    SplitButtonModule,
    TabViewModule,
    CheckboxModule,
    TriStateCheckboxModule,
    MultiSelectModule,
    CalendarModule,
    FullCalendarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AvatarModule,
    NgbModule,
    CardModule,
    MatStepperModule,
    MatSnackBarModule,
    MatIconModule
    
    
   
    
   
  ],
  providers: [ MessageService,
    ConfirmationService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
