import { Component } from '@angular/core';
import { JsonPlaceholderService } from '../../service/json-placeholder.service';
import { UserModel } from '../../../assets/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { DeleteUserComponent } from "../../components/delete-user.component";

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
    <div class="container mb-5">
      <h2>📑 Lista contatti</h2>
      <form (ngSubmit)="addUser(newUserForm)" #newUserForm="ngForm">
        <input type="text" name="name" placeholder="Nome" ngModel required>
        <input type="text" name="username" placeholder="Cognome" ngModel required>
        <input type="email" name="email" placeholder="Email" ngModel required>
        <input type="tel" name="phone" placeholder="Telefono" ngModel required>
        <button type="submit">Aggiungi contatto</button>
      </form>
      <div class="container container-card d-inline-flex">
        <div class="card d-flex justify-content-between" *ngFor="let user of users">
          <div class="detail-user">
            <p>Nome: {{ user.name }}</p>
            <p>Username: {{ user.username }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Telefono: {{ user.phone }}</p>
          </div>
          <div class="btn-user">
            <button class="btn btn-delete" (click)="selectUser(user.id)" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="fa-regular fa-trash-can fa-sm"></i></button>
            <button class="btn-edit" (click)="editUser(user)"><i class="fa-regular fa-pen-to-square fa-sm"></i></button>
          </div>
        </div>
      </div>
      <app-delete-user [data]="userToSelect"></app-delete-user>

      <form *ngIf="userToUpdate" class="d-block" (ngSubmit)="editUserForm(editUserValue, userToUpdate)" #editUserValue="ngForm">
        <label for="nome" class="form-label">Nome</label>
        <input type="text" class="form-control" id="nome" name="name" placeholder="Nome" ngModel required>
        <label for="Cognome" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" name="username" placeholder="username" ngModel required>
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" name="email" placeholder="email" ngModel required>
        <label for="telefono" class="form-label">Telefono</label>
        <input type="tel" class="form-control" id="phone" name="phone" placeholder="telefono" ngModel required>
        <button type="submit">Modifica contatto</button>
      </form>
    </div>
    
  `,
    styles: ``,
    imports: [CommonModule, FormsModule, DeleteUserComponent]
})
export class HomeComponent {

  users: UserModel[] = [];
  lastUserId: number = 0;
  userToUpdate: UserModel | null = null;
  userToSelect: any;

  constructor(private jsonPlaceholder: JsonPlaceholderService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.jsonPlaceholder.getUsersList().subscribe(users => {
      this.users = users;
      const maxId = Math.max(...this.users.map(user => user.id));
      // id più grande
      this.lastUserId = maxId;
    });
  }

  selectUser(userId: number) {
    this.userToSelect = userId;
    console.log('Utente selezionato:', this.userToSelect);
  }
  
  addUser(newUserForm: any) {
    if (newUserForm && newUserForm.valid) {
      const newUser: UserModel = {
        id: this.lastUserId++,
        name: newUserForm.value.name,
        username: newUserForm.value.username,
        email: newUserForm.value.email,
        phone: newUserForm.value.phone
      };
      this.jsonPlaceholder.createUser(newUser).subscribe((user: UserModel) => {
        this.users.push(user);
        console.log(user);
    
        newUserForm.resetForm();
      });
    }
  }

  editUser(user: UserModel) {
    this.userToUpdate = user;
    console.log(user);
  }

  editUserForm(editUserValue: any, userToUpdate: UserModel) {
    if (editUserValue && editUserValue.valid) {
      const updatedUser: UserModel = {
        id: userToUpdate.id,
        name: editUserValue.value.name,
        username: editUserValue.value.username,
        email: editUserValue.value.email,
        phone: editUserValue.value.phone
      };
      this.jsonPlaceholder.editUser(userToUpdate.id, updatedUser).subscribe((updatedUser: UserModel) => {
        // Aggiorna la lista
        this.users = this.users.map(u => (u.id === updatedUser.id ? updatedUser : u));
        console.log(updatedUser);
    
        editUserValue.resetForm();
      });
    }
  }
  
  deleteUser(id: number) {
    this.jsonPlaceholder.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

}
