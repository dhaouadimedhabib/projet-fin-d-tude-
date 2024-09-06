import { Component, OnInit } from '@angular/core';
import { Disponibilite } from '../modele/Disponibilite';
import { ProfessionnelService } from '../Service/professionnel.service';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent implements OnInit {
  disponibilite: Disponibilite = {
    heureDebut1: '',
    heureFin1: '',
    heureDebut2: '',
    heureFin2: ''
    
  };
  date!: Date; 
  professionnelId: number = 0;
  disponibiliteIdToEdit: number = 0;
  disponibilites: Disponibilite[] = [];
  displayDialog: boolean = false;
  isEditMode: boolean = false;

  constructor(private disponibiliteService: ProfessionnelService) {}

  ngOnInit(): void {
    const professionnelId = localStorage.getItem('idProfessionnel');
    if (professionnelId) {
      this.professionnelId = Number(professionnelId);
      if (isNaN(this.professionnelId)) {
        console.error('Le professionnelId récupéré est invalide.');
      } else {
        this.loadDisponibilites();
      }
    } else {
      console.error('idProfessionnel non trouvé dans le local storage.');
    }
  }

  loadDisponibilites(): void {
    this.disponibiliteService.getDisponibilitesByProfessionnel(this.professionnelId)
      .subscribe(disponibilites => {
        this.disponibilites = disponibilites;
        console.log(this.disponibilites);
      }, error => {
        console.error('Erreur lors du chargement des disponibilités:', error);
      });
  }

  showAddDialog(): void {
    this.isEditMode = false;
    this.disponibilite = {
      heureDebut1: '',
      heureFin1: '',
      heureDebut2: '',
      heureFin2: ''
    };
    this.date = new Date(); // Initialisez `date` à une valeur par défaut (par exemple, la date actuelle)
    this.displayDialog = true;
  }

  showEditDialog(disponibilite: Disponibilite): void {
    this.isEditMode = true;
    this.disponibilite = { ...disponibilite };
    this.disponibiliteIdToEdit = disponibilite.idDisponibilite!;
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.displayDialog = false;
  }

  saveDisponibilite(): void {
    if (this.isEditMode) {
      this.editDisponibilite();
    } else {
      this.addDisponibilite();
    }
    this.hideDialog();
  }

  addDisponibilite(): void {
    if (!this.date) {
      console.error('La date doit être définie avant d\'ajouter une disponibilité.');
      return;
    }
  
    // Convertir la date en format ISO et la définir dans disponibilite
    this.disponibilite.date = this.date.toISOString().split('T')[0];
  
    console.log('Disponibilité à ajouter:', JSON.stringify(this.disponibilite));
  
    this.disponibiliteService.addDisponibilite(this.professionnelId, this.disponibilite)
      .subscribe(response => {
        console.log('Disponibilité ajoutée:', response);
        this.loadDisponibilites();
      }, error => {
        console.error('Erreur lors de l\'ajout de la disponibilité:', error);
      });
  }

  editDisponibilite(): void {
    this.disponibiliteService.editDisponibilite(this.disponibiliteIdToEdit, this.disponibilite)
      .subscribe(response => {
        this.loadDisponibilites();
      }, error => {
        console.error('Erreur lors de la modification de la disponibilité:', error);
      });
  }

  deleteDisponibilite(disponibiliteId: number): void {
    this.disponibiliteService.deleteDisponibilite(disponibiliteId)
      .subscribe(() => {
        console.log('Disponibilité supprimée');
        this.loadDisponibilites();
      }, error => {
        console.error('Erreur lors de la suppression de la disponibilité:', error);
      });
  }


  
}
