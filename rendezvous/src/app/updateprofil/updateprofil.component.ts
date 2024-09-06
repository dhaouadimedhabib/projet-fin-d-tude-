import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../Service/user.service';
import { User } from '../modele/user';

@Component({
  selector: 'app-updateprofil',
  templateUrl: './updateprofil.component.html',
  styleUrls: ['./updateprofil.component.css']
})
export class UpdateprofilComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  firstnameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  FormControl = new FormControl('', [Validators.required]);
  numberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\+?[1-9]\d{1,14}$/)
  ]);

  userForm: FormGroup;
  userId: number | null = null; // Initialise avec null
  user: User | undefined;
  selectedFileName: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required], // Ajoutez le champ username ici
      image: [null]
    });
  }
  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    console.log('Retrieved userId from localStorage:', storedUserId);

    if (storedUserId) {
        this.userId = Number(storedUserId); 
        console.log('Parsed userId:', this.userId);

        if (!isNaN(this.userId)) {
            this.loadUser();
        } else {
            console.error('User ID is not a valid number:', this.userId);
            // Handle invalid user ID
        }
    } else {
        console.error('User ID not found in localStorage');
        // Handle missing user ID
    }
}

  loadUser(): void {
    if (this.userId !== null) {
      this.userService.getUserById(this.userId).subscribe(
        (data: User) => {
          this.user = data;
          this.userForm.patchValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            number: this.user.numeroTel,
            password: this.user.password, // Laissez le mot de passe vide initialement
            username: this.user.username // Mettez à jour le champ username
          });
          console.log('User loaded:', this.user);
        },
        (error) => {
          console.error('Error loading user:', error);
        }
      );
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (this.user && file) {
      this.user.image = file.name;
      // Logique supplémentaire pour gérer le téléchargement de fichier peut être ajoutée ici
    } else {
      this.selectedFileName = null;
    }
  }

  updateProfile(): void {
    if (this.userForm.valid && this.user) {
      const userToUpdate = {
        userId: this.user.userId,
        username: this.userForm.get('username')?.value,
        password: this.userForm.get('password')?.value,
        firstName: this.userForm.get('firstName')?.value,
        lastName: this.userForm.get('lastName')?.value,
        email: this.userForm.get('email')?.value,
        numeroTel: this.userForm.get('number')?.value,
        image: this.user.image // Gérez le nom du fichier ou le chemin de l'image
      };

      this.userService.updateUser(userToUpdate).subscribe(
        (response) => {
          alert('User updated successfully!');
          window.location.reload();
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Error updating user!');
        }
      );
    } else {
      console.log('Form is invalid or user data is missing');
    }
  }
}
