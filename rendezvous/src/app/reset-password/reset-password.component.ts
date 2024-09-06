import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
 
  }
  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe(
      response => {
        this.message = response;
      },
      
    );
  }

}
