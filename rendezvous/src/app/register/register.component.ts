import { Component } from '@angular/core';
import { User } from '../modele/user';
import { Role } from '../modele/role';
import { UserService } from '../Service/user.service';
import { RoleName } from '../modele/rolename';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    numeroTel: '',
    image: '',
    role: [Role.CLIENT]
  
  };
  constructor(private userService: UserService) {}
  register(): void {
    this.userService.register(this.user)
      .subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          alert('User registered successfully!'); // Alert pour un succès
        },
        (error) => {
          console.error('Error registering user:', error);
          alert('Error: Username is already taken! '); // Alert pour un échec
        }
      );
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.user.image = file.name;
  };
}
