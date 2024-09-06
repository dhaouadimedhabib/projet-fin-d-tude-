import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../modele/user';
import { UserService } from '../Service/user.service';
import { Disponibilite } from '../modele/Disponibilite';
import { ProfessionnelService } from '../Service/professionnel.service';
import { NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RendezVous } from '../modele/rendezvous';
import { RendezVousService } from '../Service/rendez-vous.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  userId: number | null = null;
  user: User | null = null;
  disponibilites: Disponibilite[] = [];
  filteredDisponibilites: string[] = [];
  selectedDate: NgbDateStruct | null = null;
  newRendezVous: RendezVous = this.initNewRendezVous();
  modalRef: NgbModalRef | null = null;
  debutTime: string = '';
  finTime: string = '';
  professionnelId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private disponibiliteService: ProfessionnelService,
    private rendezVousService: RendezVousService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id ? +id : null;

    if (this.userId !== null) {
      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          this.user = data;

          if (this.user && this.user.professionnelId) {
            this.professionnelId = this.user.professionnelId;
            this.loadDisponibilites(this.professionnelId);
          } else {
            console.error('Professionnel ID non trouvé pour l\'utilisateur');
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'utilisateur', error);
        }
      );
    } else {
      console.error('ID de l\'utilisateur non trouvé dans l\'URL');
    }
  }

  loadDisponibilites(professionnelId: number): void {
    if (this.selectedDate) {
      const selectedDateStr = this.formatDate(this.selectedDate);
      this.disponibiliteService.getDisponibilitesByDateAndProfessionnel(professionnelId, selectedDateStr).subscribe(
        (timeSlots) => {
          this.filteredDisponibilites = timeSlots;
        },
        (error) => {
          console.error('Erreur lors de la récupération des disponibilités', error);
        }
      );
    }
  }

  onDateSelection(date: NgbDateStruct): void {
    this.selectedDate = date;
    if (this.professionnelId !== null) {
      this.loadDisponibilites(this.professionnelId);
    }

    this.newRendezVous.date = new Date(date.year, date.month - 1, date.day);
  }

  formatDate(date: NgbDateStruct): string {
    const day = date.day < 10 ? `0${date.day}` : date.day;
    const month = date.month < 10 ? `0${date.month}` : date.month;
    return `${date.year}-${month}-${day}`; // Utilisez les backticks ici
  }

  reserve(slot: string, content: any): void {
    const [debut, fin] = slot.split('-');
    const [debutHeure, debutMinute] = debut.split(':').map(part => part.padStart(2, '0'));
    const [finHeure, finMinute] = fin.split(':').map(part => part.padStart(2, '0'));

    this.newRendezVous.date = new Date(this.selectedDate!.year, this.selectedDate!.month - 1, this.selectedDate!.day);
    this.newRendezVous.debut = { hours: parseInt(debutHeure, 10), minutes: parseInt(debutMinute, 10) };
    this.newRendezVous.fin = { hours: parseInt(finHeure, 10), minutes: parseInt(finMinute, 10) };

    this.debutTime = `${debutHeure}:${debutMinute}`;
    this.finTime = `${finHeure}:${finMinute}`;

    this.modalRef = this.modalService.open(content);
  }

  initNewRendezVous(): RendezVous {
    return {
      date: new Date(),
      debut: { hours: 9, minutes: 0 },
      fin: { hours: 10, minutes: 0 },
      statuts: 'ECHEC',
      nomClient: ''
    };
  }

  openAddDialog(): void {
    this.newRendezVous = this.initNewRendezVous();
    const today = new Date();
    this.newRendezVous.date = today;
    this.debutTime = `${this.newRendezVous.debut.hours.toString().padStart(2, '0')}:${this.newRendezVous.debut.minutes.toString().padStart(2, '0')}`;
    this.finTime = `${this.newRendezVous.fin.hours.toString().padStart(2, '0')}:${this.newRendezVous.fin.minutes.toString().padStart(2, '0')}`;
    this.modalRef = this.modalService.open('addAppointmentModal');
  }
  ajouterRendezVous(modal: any): void {
    if (this.professionnelId !== null) {
        const rendezVousToSend: any = {
            date: this.formatDateForInput(this.newRendezVous.date),
            debut: `${this.pad(this.newRendezVous.debut.hours)}:${this.pad(this.newRendezVous.debut.minutes)}`,
            fin: `${this.pad(this.newRendezVous.fin.hours)}:${this.pad(this.newRendezVous.fin.minutes)}`,
            statuts: this.newRendezVous.statuts,
            nomClient: this.newRendezVous.nomClient.trim()
        };

        console.log('Objet RendezVous à envoyer :', rendezVousToSend);

        this.rendezVousService.ajouterRendezVous(this.professionnelId, rendezVousToSend).subscribe({
          next: (response: any) => {
            console.log('Réponse du serveur :', response);
    
            modal.close();
    
            // Assurez-vous que l'ID est bien récupéré
            
            const rendezVousId = response?.AppointmentId ?? null;
            console.log('ID du rendez-vous:', rendezVousId);
    
            if (rendezVousId !== undefined && rendezVousId !== null) {
              this.router.navigate(['/paiement', rendezVousId]);
            } else {
              console.error('L\'ID du rendez-vous est indéfini.');
            }
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du rendez-vous.', error);
          }
        });
      } else {
        console.error('ID du professionnel non disponible.');
      }
    }
  
  formatDateForInput(date: Date): string {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  
  }

  combineDateTime(date: Date, time: { hours: number, minutes: number }): string {
    const combinedDate = new Date(date); // Crée une nouvelle instance de Date
    combinedDate.setHours(time.hours);
    combinedDate.setMinutes(time.minutes);
    return combinedDate.toISOString().split('T')[1].slice(0, 5); // Retourne l'heure au format HH:mm
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

}
