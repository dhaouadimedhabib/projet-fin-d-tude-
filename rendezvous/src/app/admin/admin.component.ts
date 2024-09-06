import { Component, ViewChild } from '@angular/core';
import { User } from '../modele/user';
import { UserService } from '../Service/user.service';
import { ConfirmationService, MessageService, SortMeta } from 'primeng/api';
import { Role } from '../modele/role';
import { Table } from 'primeng/table';
import { NotificationService } from '../Service/notification.service';
import { Notification } from '../modele/Notification';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  userDialog: boolean = false;
  users!: User[];
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
  
  @ViewChild('dt') dt!: Table;
  selectedUsers!: User[] | null;
  submitted: boolean = false;
  displayAddUserDialog: boolean = false;
  multiSortMeta: SortMeta[] = [];
  unreadNotificationCount: number = 0;
  currentPage: number = 0;
  pageSize: number = 4;
  totalPages: number = 0;
  notifications: Notification[] = [];
  displayNotificationDialog: boolean = false;

  constructor(private userService: UserService, private messageService: MessageService,
     private confirmationService: ConfirmationService,private notificationService: NotificationService, 
     private userservice : UserService,
    private router : Router) {}

     ngOnInit() {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        // Redirect to login page or show an appropriate message
        alert('Session expired or invalid. Please log in again.');
        this.router.navigate(['/login']);
      } else {
        // Fetch the user list if the user is authenticated
        this.userService.getAllUsers().subscribe((data: User[]) => {
          this.users = data;
          this.fetchNotifications(this.currentPage, this.pageSize);
        });
      }
    }
  getRoleName(user: any): string {
    if (user.roles && user.roles.length > 0) {
        return user.roles[0].roleName;  // On suppose qu'il n'y a qu'un rôle par utilisateur
    }
    return '';
}
openNew() {
  this.user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    numeroTel: '',
    image: '',
    role: [Role.PROFESSIONAL] // Utiliser "roles" au lieu de "role"
  };
  this.submitted = false;
  this.userDialog = true;
}

  deleteSelectedUsers() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected users?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              // Supprimer les utilisateurs sélectionnés
              if (this.selectedUsers) {
                  this.selectedUsers.forEach(selectedUser => {
                      this.users = this.users.filter(user => user !== selectedUser);
                  });
                  this.selectedUsers = null;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
              }
          }
      });
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }
  deleteUser(userId: number) {
    this.userService.deleteUser(userId)
        .subscribe(
            (response) => {
                console.log('User deleted successfully:', response);
                this.users = this.users.filter(user => user.userId !== userId);
                alert('User deleted successfully!');
            },
            (error) => {
                console.error('Error deleting user:', error);
                alert('Error deleting user!');
            }
        );
}

  hideDialog() {
      this.userDialog = false;
      this.submitted = false;
  }

  saveUser() {
    if (this.user.userId) {
      // Create a new object with only the necessary fields
      const userToUpdate = {
        userId: this.user.userId,
        username: this.user.username,
        password: this.user.password,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        numeroTel: this.user.numeroTel,
        image: this.user.image
        // Do not include roles here
      };
  
      this.userService.updateUser(userToUpdate)
        .subscribe(
          (response) => {
            // Update the users array with the updated user data
            this.users = this.users.map(u => u.userId === this.user.userId ? { ...u, ...userToUpdate } : u);
            this.userDialog = false;
            alert('User updated successfully!');
          },
          (error) => {
            console.error('Error updating user:', error);
            alert('Error updating user!');
          }
        );
    } else {
      // Register new user logic
      this.userService.register(this.user)
        .subscribe(
          (response) => {
            this.users.push(response);
            this.userDialog = false;
            alert('User registered successfully!');
          },
          (error) => {
            console.error('Error registering user:', error);
            alert('Error: Username is already taken!');
          }
        );
    }
  }
 
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.user.image = file.name; // Only access `file.name` if `file` is defined
  } else {
    console.error('No file selected');
    this.user.image = ''; // Or handle it as needed
  }
}
  applyFilter(event: Event) {
    const element = event.target as HTMLInputElement; // Type assertion
    const value = element.value;
    if (this.dt) {
      this.dt.filterGlobal(value, 'contains');
    }
  }
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.dt.filterGlobal(target.value, 'contains');
    }
  }
  openNotificationsModal() {
    this.currentPage = 0; // Reset to the first page
    this.fetchNotifications(this.currentPage, this.pageSize); // Fetch notifications
    this.showDialog(); // Show the dialog
  }
  fetchNotifications(page: number, size: number) {
    this.notificationService.getNotifications(page, size).subscribe(response => {
      this.notifications = response.content.map((notification: Notification) => ({
        ...notification,
        time: this.getTimeElapsed(new Date(notification.timestamp).getTime())
      }));
      this.calculateTotalPages(response.totalElements);
      this.updateUnreadNotificationCount();
    });
  }

  calculateTotalPages(totalElements: number) {
    this.totalPages = Math.ceil(totalElements / this.pageSize);
  }
  getTimeElapsed(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return 'Just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
  updateUnreadNotificationCount() {
    // Assuming unread notifications are those that are not older than a certain time (e.g., last 24 hours)
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const now = Date.now();
    this.unreadNotificationCount = this.notifications.filter(notification => now - new Date(notification.timestamp).getTime() < oneDayInMillis).length;
  }
  loadNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchNotifications(this.currentPage, this.pageSize);
    }
  }

  loadPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchNotifications(this.currentPage, this.pageSize);
    }
  }

  showDialog() {
    this.displayNotificationDialog = true;
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.userservice.logout();

  }
}
