import { Component } from '@angular/core';
import { ReclamationService } from '../Service/reclamation.service';
import { Reclamation } from '../modele/reclamation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  reclamation: Reclamation = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(private reclamationService: ReclamationService) {}

  submitReclamation() {
    this.reclamationService.addReclamation(this.reclamation).subscribe(
      response => {
        console.log('Reclamation submitted successfully', response);
        alert('Message sent successfully!');
        document.getElementById('submitSuccessMessage')?.classList.remove('d-none');
      },
      error => {
        console.error('Error submitting reclamation', error);
        document.getElementById('submitErrorMessage')?.classList.remove('d-none');
        alert('There was an error sending your message.');

      }
    );
  }
}
