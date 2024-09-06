import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Service } from '../modele/Services';
import { ServiceService } from '../Service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; // Importer MatDialogRef
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  service: Service | undefined;
  professionnelId: number | null = null; // Initialiser à null
  serviceForm: FormGroup;
  alertVisible: boolean = false;
  @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>; // Référence au template
  dialogRef!: MatDialogRef<any>; // Référence au dialogue

  constructor(
    private serviceService: ServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire
    this.serviceForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Récupérer le professionnelId du local storage
    const storedId = localStorage.getItem('idProfessionnel');
    if (storedId) {
      this.professionnelId = +storedId; // Convertir en nombre
      this.getService(this.professionnelId);
    } else {
      console.error('No professionnelId found in local storage');
      this.snackBar.open('No professionnelId found in local storage.', 'Close', {
        duration: 5000,
      });
    }
  }

  getService(professionnelId: number): void {
    this.serviceService.getServiceByProfessionnelId(professionnelId).subscribe(
      (data) => {
        // Check if the service data has a valid duree value
        if (data && typeof data.duree === 'number') {
          // Convert duration from seconds to minutes
          data.duree = (data.duree / 60).toFixed(0); // Convert to minutes and round to the nearest integer
        }
        
        // Assign the data to the service object
        this.service = data;
  
        console.log('Service retrieved successfully', this.service);
        this.snackBar.open('Service retrieved successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error retrieving service', error);
        this.snackBar.open('An error occurred while loading the service.', 'Close', {
          duration: 5000,
        });
      }
    );
  }
  

  openPopup() {
    this.dialogRef = this.dialog.open(this.popupTemplate, {
      width: '400px',
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createService(result);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(); // Ferme le dialogue
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const formValue = this.serviceForm.value;

      // Convert duree from minutes to ISO-8601 format
      formValue.duree = `PT${formValue.duree}M`;

      this.dialogRef.close(formValue);
    }
  }
  createService(serviceData: Service) {
    if (this.professionnelId) {
      this.serviceService.createService(serviceData, this.professionnelId).subscribe(
        (createdService) => {
          this.snackBar.open('Service created successfully!', 'Close', {
            duration: 3000,
          });
          this.service = createdService; // Mettre à jour l'interface utilisateur avec le service créé
        },
        (error) => {
          console.error('Error creating service', error);
          this.snackBar.open('An error occurred while creating the service.', 'Close', {
            duration: 5000,
          });
        }
      );
    }
  }

  updateService() {
    if (this.professionnelId && this.service) {
      // Assuming service.duree is in minutes, format it as ISO 8601
      this.service.duree = `PT${this.service.duree}M`;
  
      this.serviceService.updateService(this.professionnelId, this.service)
        .subscribe(
          (updatedService) => {
            // Handle the response, e.g., update UI or show a message
            console.log('Service updated successfully', updatedService);
          },
          (error) => {
            // Handle the error, e.g., show an error message
            console.error('Error updating service', error);
          }
        );
    } else {
      console.error('Professionnel ID or Service Details are missing');
    }
  }
}
