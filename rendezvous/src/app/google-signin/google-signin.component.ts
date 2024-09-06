import { Component } from '@angular/core';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css']
})
export class GoogleSigninComponent {
  constructor(private authService: UserService, private router: Router) {}

 
}
