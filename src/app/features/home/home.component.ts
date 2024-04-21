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
    <button>Aggiungi contatto</button>
    <form (ngSubmit)="addUser(newUserForm)" #newUserForm="ngForm">
      <input type="text" name="name" placeholder="Nome" ngModel required>
      <input type="text" name="username" placeholder="Cognome" ngModel required>
      <input type="email" name="email" placeholder="Email" ngModel required>
      <input type="tel" name="phone" placeholder="Telefono" ngModel required>
      <button type="submit">Aggiungi contatto</button>
    </form>

    <h2>Elenco contatti</h2>
    <ul>
      <li *ngFor="let user of users">
        <p>Nome: {{ user.name }}</p>
        <p>Username: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Telefono: {{ user.phone }}</p>
        <button (click)="deleteUser(user.id)">Elimina</button>
        <button (click)="editUser(user)">Modifica</button>
      </li>
    </ul>

    <form *ngIf="userToUpdate" (ngSubmit)="editUserForm(editUserValue, userToUpdate)" #editUserValue="ngForm">
      <input type="text" name="name" placeholder="Nome" ngModel required>
      <input type="text" name="username" placeholder="Cognome" ngModel required>
      <input type="email" name="email" placeholder="Email" ngModel required>
      <input type="tel" name="phone" placeholder="Telefono" ngModel required>
      <button type="submit">Modifica contatto</button>
    </form>
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
