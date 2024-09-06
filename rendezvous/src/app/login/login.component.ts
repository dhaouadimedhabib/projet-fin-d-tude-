import { Component } from '@angular/core';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: UserService, private router: Router) {}

  username!: string;
  password!: string;
  error!: string;
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Redirigez l'utilisateur en fonction de son rôle
        const roles = response.roles;
        if (roles.includes('ADMIN')) {
          this.router.navigate(['/admin']);
          console.log('Navigating to admin');
        } else if (roles.includes('PROFESSIONAL')) {
          this.router.navigate(['/listerdv']);
          console.log('Navigating to listerdv');
        } else if (roles.includes('CLIENT')) {
          this.router.navigate(['/client']);
          console.log('Navigating to client');
        } else {
          this.router.navigate(['/home']);
          console.log('Navigating to home');
        }
      },
      error: (err) => {
        this.error = 'Invalid credentials'; // Vous pouvez affiner le message d'erreur si nécessaire
        console.error(err);
      }
    });
  }


}
