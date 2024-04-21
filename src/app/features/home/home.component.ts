import { Component } from '@angular/core';
import { JsonPlaceholderService } from '../../service/json-placeholder.service';
import { UserModel } from '../../../assets/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      <button>Aggiungi contatto</button>
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
            <button class="btn-edit" (click)="editUser(user)"><i class="fa-regular fa-pen-to-square fa-sm"></i></button>
            <button class="btn-delete" (click)="deleteUser(user.id)"><i class="fa-regular fa-trash-can fa-sm"></i></button>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">Offcanvas right</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          ...
        </div>
      </div>

      <form *ngIf="userToUpdate" (ngSubmit)="editUserForm(editUserValue, userToUpdate)" #editUserValue="ngForm">
        <input type="text" name="name" placeholder="Nome" ngModel required>
        <input type="text" name="username" placeholder="Cognome" ngModel required>
        <input type="email" name="email" placeholder="Email" ngModel required>
        <input type="tel" name="phone" placeholder="Telefono" ngModel required>
        <button type="submit">Modifica contatto</button>
      </form>
    </div>
    
  `,
  styles: ``
})
export class HomeComponent {

  users: UserModel[] = [];
  lastUserId: number = 0;
  userToUpdate: UserModel | null = null;

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
