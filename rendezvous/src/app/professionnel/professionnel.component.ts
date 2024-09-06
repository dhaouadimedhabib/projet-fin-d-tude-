import { Component } from '@angular/core';
import { UserService } from '../Service/user.service';
import { User } from '../modele/user';

@Component({
  selector: 'app-professionnel',
  templateUrl: './professionnel.component.html',
  styleUrls: ['./professionnel.component.css']
})
export class ProfessionnelComponent {
  constructor(private userService: UserService) {}

  users: User[] = [];
  searchText!:any;
  filteredUsers: User[] = [];

  ngOnInit(): void {
    this.userService.getProfessionnels().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data; // Initialiser filteredUsers avec la liste complète

    });
  }
  filterUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      (user.firstName + ' ' + user.lastName).toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
