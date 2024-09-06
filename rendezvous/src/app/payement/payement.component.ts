import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { PaiementService } from '../Service/paiement.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css']
})
export class PayementComponent implements AfterViewInit {
  paymentForm: FormGroup;
  stripe: Stripe | null = null;
  cardElement: StripeCardElement | null = null;
  loading = false;
  error: string | null = null;
  idRendezVous: number | null = null;
  montant: number | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute, // Injection du service ActivatedRoute
    private paiementservice : PaiementService
  ) {
    this.paymentForm = this.fb.group({
      email: [''],
      currency: ['eur']
    });
  }

  async ngAfterViewInit() {
    // Récupération de l'ID du rendez-vous à partir de l'URL
    this.idRendezVous = Number(this.route.snapshot.paramMap.get('rendezVousId'));
    
    if (this.idRendezVous) {
      this.paiementservice.getMontant(this.idRendezVous).subscribe({
        next: (montant) => this.montant = montant,
        error: (err) => console.error('Error fetching montant', err)
      });
    }

    this.stripe = await loadStripe('pk_test_51Mhh5CCqp93FIwJxZiJyVxXPpwU6Z0NkgDcHE757leR5bgjiG3uQnahuEi7c08rBo8Kals6VM148hKZcTIv6knAp00iFfEbt7O'); // Replace with your Stripe publishable key
    const elements = this.stripe?.elements();
    if (elements) {
      this.cardElement = elements.create('card');
      this.cardElement.mount('#card-element');
    }
  }

  async onSubmit() {
    this.loading = true;
    this.error = null;
  
    if (!this.stripe || !this.cardElement) {
      this.error = 'Stripe is not loaded properly.';
      this.loading = false;
      return;
    }
  
    const { token, error } = await this.stripe.createToken(this.cardElement);
  
    if (error) {
      this.error = error.message ?? null;
      this.loading = false;
    } else if (token) {
      const formData = {
        token: token.id,
        currency: this.paymentForm.value.currency,
        idRendezVous: this.idRendezVous // Utilisation de l'ID récupéré
      };
  
      console.log('Form Data:', formData); // Log the form data
      console.log('Headers:', { 'Content-Type': 'application/json' }); // Log the headers
  
      this.http.post('http://localhost:8084/api/paiement/payer', formData, {
        headers: { 'Content-Type': 'application/json' } // Ensure headers are set correctly
      }).subscribe(
        (response: any) => {
          console.log('Payment Response:', response); // Log the response
          alert('Payment successful!');
          this.loading = false;
        },
        (error) => {
          console.error('Payment Error:', error); // Log the error response
          this.error = error.message ?? null;
          this.loading = false;
        }
      );
    }
  }
}
