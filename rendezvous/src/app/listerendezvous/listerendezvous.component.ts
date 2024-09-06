import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RendezVousService } from '../Service/rendez-vous.service';
import { RendezVous } from '../modele/rendezvous';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Time } from '@angular/common';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listerendezvous',
  templateUrl: './listerendezvous.component.html',
  styleUrls: ['./listerendezvous.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListerendezvousComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay' // Ajout des boutons de vue
    },
    dateClick: this.handleDateClick.bind(this),
    events: [],
    eventClick: this.handleEventClick.bind(this),
    eventContent: this.renderEventContent.bind(this) // Ajout de la fonction de rendu des événements
  };

  displayDialog: boolean = false;
  editDialog: boolean = false;
  selectedRendezVous?: RendezVous;
  newRendezVous: RendezVous = this.initNewRendezVous();
  addDialog: boolean = false;

  constructor(private rendezVousService: RendezVousService, private confirmationService: ConfirmationService, 
    private userservice : UserService, private router: Router) {}

  ngOnInit() {
    const idProfessionnel = localStorage.getItem('idProfessionnel');
    if (idProfessionnel) {
      this.getRendezVousByProfessionnelId(parseInt(idProfessionnel, 10));
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  getRendezVousByProfessionnelId(professionnelId: number) {
    this.rendezVousService.getRendezVousByProfessionnelId(professionnelId).subscribe(
      rendezVous => {
        this.calendarOptions.events = this.transformRendezVousToEvents(rendezVous);
      },
      error => {
        console.error('Error loading rendez-vous:', error);
      }
    );
  }

  transformRendezVousToEvents(rendezVous: RendezVous[]): any[] {
    return rendezVous.map(rv => {
        return {
            title: rv.statuts, // Afficher uniquement le statut dans le titre
            start: this.combineDateTime(rv.date, rv.debut),
            end: this.combineDateTime(rv.date, rv.fin),
            nomclient: rv.nomClient,
            allDay: false,
            extendedProps: {
                rendezVous: rv
            }
        };
    });
  }

  combineDateTime(date: Date, time: Time): string {
    const dateObj = (date instanceof Date) ? date : new Date(date);
    const dateString = dateObj.toISOString().split('T')[0];
    const hours = time && time.hours !== undefined ? time.hours : 0;
    const minutes = time && time.minutes !== undefined ? time.minutes : 0;
    const timeString = `${this.pad(hours)}:${this.pad(minutes)}:00`;
    return `${dateString}T${timeString}`;
  }

  pad(value: number | undefined): string {
    return (value ?? 0).toString().padStart(2, '0');
  }

  handleDateClick(arg: any) {
    alert('Date click! ' + arg.dateStr);
  }

  handleEventClick(clickInfo: any) {
    this.selectedRendezVous = clickInfo.event.extendedProps.rendezVous;
    if (this.selectedRendezVous) {
      this.displayDialog = true;
    } else {
      console.error('RendezVous data is missing from event');
    }
  }

  hideDialog() {
    this.displayDialog = false;
  }

  supprimerRendezVous(id: number) {
    this.rendezVousService.supprimerRendezVous(id).subscribe(
      () => {
        this.getRendezVousByProfessionnelId(parseInt(localStorage.getItem('idProfessionnel')!, 10));
        this.hideDialog();
        window.location.reload();
      },
      error => {
        console.error('Error deleting rendez-vous:', error);
      }
    );
  }

  openEditDialog() {
    this.hideDialog();
    this.editDialog = true;
  }

  confirmDelete() {
    if (this.selectedRendezVous) {
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer ce rendez-vous?',
        accept: () => {
          this.supprimerRendezVous(this.selectedRendezVous!.appointmentId!);
        }
      });
    }
  }

  hideEditDialog() {
    this.editDialog = false;
  }

  updateRendezVous() {
    if (this.selectedRendezVous) {
      this.rendezVousService.updateRendezVous(this.selectedRendezVous).subscribe({
        next: (data) => {
          console.log('Update successful', data);
          this.getRendezVousByProfessionnelId(parseInt(localStorage.getItem('idProfessionnel')!, 10));
          this.hideEditDialog();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error updating rendez-vous:', error);
        }
      });
    }
  }

  openAddDialog() {
    this.newRendezVous = this.initNewRendezVous();
    this.addDialog = true;
  }

  ajouterRendezVous() {
    const professionnelId = parseInt(localStorage.getItem('idProfessionnel')!, 10);
    this.rendezVousService.ajouterRendezVous(professionnelId, this.newRendezVous).subscribe({
      next: (response) => {
        alert('Le rendez-vous a été ajouté avec succès.');
        this.addDialog = false;
        this.getRendezVousByProfessionnelId(professionnelId);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du rendez-vous.', error);
      }
    });
  }

  initNewRendezVous(): RendezVous {
    return {
      date: new Date(),
      debut: { hours: 9, minutes: 0 },
      fin: { hours: 10, minutes: 0 },
      statuts: '',
      nomClient: ''
    };
  }

  renderEventContent(eventInfo: any) {
    return { html: `<div>${eventInfo.event.title}</div>` };
  }

  logout() {
    this.userservice.logout();

  }
}
