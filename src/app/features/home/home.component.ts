import { Component } from '@angular/core';
import { JsonPlaceholderService } from '../../service/json-placeholder.service';
import { UserModel } from '../../../assets/user.model';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeleteUserComponent } from "../../components/delete-user.component";
import { EditUserComponent } from "../../components/edit-user.component";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-home',
    standalone: true,
    template: `
    <div class="container-full mb-5">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid d-flex justify-content-center">
          <span class="navbar-brand mb-0 h1 text-center">Gestione Contatti</span>
        </div>
      </nav>
    </div>
    <!-- titolo e bottone aggiungi utente -->
    <div class="container mb-5">
      <div class="container d-flex justify-content-between">
        <h2>📑 Lista contatti</h2>
        <button class="btn btn-light btn-add-user mr-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          <i class="fa-solid fa-user-plus"></i> Aggiungi Contatto
        </button>
      </div>
      <!-- form aggiungi utente -->
      <div class="container container-card d-flex mt-4 ">
        <div class="collapse w-100" id="collapseExample">
          <div class="card-form">
            <form class="newUserForm" (ngSubmit)="addUser(newUserForm)" #newUserForm="ngForm">
              <div class="grid-container-5">
                <input type="text" name="name" placeholder="Nome" ngModel required class="grid-item">
                <input type="text" name="username" placeholder="Username" ngModel required class="grid-item">
                <input type="email" name="email" placeholder="Email" ngModel required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" class="grid-item">
                <input type="tel" name="phone" placeholder="Telefono" ngModel required pattern="[0-9]{10}" class="grid-item">
                <button type="submit" [ngClass]="!newUserForm.valid ? 'submit-invalid' : 'submit-add'" [disabled]="!newUserForm.valid"><i class="fa-solid fa-plus"></i></button>
              </div>
            </form>
          </div>
        </div>
        <!-- lista utenti -->
        <div class="card d-flex justify-content-between" *ngFor="let user of users">
          <div class="detail-user">
            <p>Nome: {{ user.name }}</p>
            <p>Username: {{ user.username }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Telefono: {{ user.phone }}</p>
          </div>
          <!-- bottoni elimina e modifica utente -->
          <div class="btn-user">
            <button class="btn btn-delete" (click)="selectUser(user)" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="fa-regular fa-trash-can fa-sm"></i></button>
            <button class="btn btn-edit" (click)="selectUser(user)" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"><i class="fa-regular fa-pen-to-square fa-sm"></i></button>
          </div>
        </div>
      </div>
      <!-- caricamento componenti edit e delete -->
      <app-edit-user [data]="userToSelect" (userDataChanged)="updateUserData($event)"></app-edit-user>
      <app-delete-user [data]="userToSelect" (deleteConfirmed)="deleteUser($event)"></app-delete-user>
    </div>
    
  `,
    styles: ``,
    imports: [CommonModule, FormsModule, DeleteUserComponent, EditUserComponent]
})
export class HomeComponent {

  users: UserModel[] = [];
  lastUserId: number = 0;
  userToUpdate: UserModel | null = null;
  userToSelect: any;

  constructor(private jsonPlaceholder: JsonPlaceholderService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.jsonPlaceholder.getUsersList().subscribe(users => {
      this.users = users;
      if (this.users.length > 0) {
        const maxId = Math.max(...this.users.map(user => user.id));
        this.lastUserId = maxId;
      }
    });
  }

  selectUser(userId: UserModel) {
    this.userToSelect = userId;
    console.log('Utente selezionato:', this.userToSelect);
  }
  
  addUser(newUserForm: any) {
    if (newUserForm && newUserForm.valid) {
      const newUser: UserModel = {
        id: this.lastUserId,
        name: newUserForm.value.name,
        username: newUserForm.value.username,
        email: newUserForm.value.email,
        phone: newUserForm.value.phone
      }
      // Chiamata creazione utente
      this.jsonPlaceholder.createUser(newUser).subscribe((createdUser: UserModel) => {
        createdUser.id = ++this.lastUserId; // Incremento Id
        this.users.unshift(createdUser); // Aggiunto alla lista
        this.toastr.success('Utente aggiunto');
        newUserForm.resetForm();
      });
    } else {
      // notifica errore
      this.toastr.error('Controlla i campi del modulo');
    }
  }

  // Metodo modifica utente
  editUser(user: UserModel) {
    this.userToUpdate = user;
  }

  // Aggiornamento dati utente
  updateUserData(event: { field: string, value: any }) {
    if (this.userToSelect) {
      this.userToSelect[event.field] = event.value;
    }
  }

  // Eliminazione utente
  deleteUser(id: number) {
    this.jsonPlaceholder.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.userToSelect = null;
      this.toastr.success('Utente aggiunto');
    });
  }

}
