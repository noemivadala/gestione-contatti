import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UserModel } from '../../assets/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPlaceholderService } from '../service/json-placeholder.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasBottomLabel">Modifica il contatto di {{ data?.name }}</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body small">
        <!-- form modifica utente, passaggio dato e valore modificato -->
        <form *ngIf="data" class="form-edit" (ngSubmit)="editUserForm(editUserValue, data)" #editUserValue="ngForm">
          <div class="grid-container">
            <div class="grid-item">
              <input type="text" class="form-control" id="nome" name="name" placeholder="{{data.name}}" ngModel (ngModelChange)="onUserDataChange($event, 'name')">
            </div>
            <div class="grid-item">
              <input type="text" class="form-control" id="username" name="username" placeholder="{{data.username}}" ngModel (ngModelChange)="onUserDataChange($event, 'username')">
            </div>
            <div class="grid-item">
              <input type="email" class="form-control" id="email" name="email" placeholder="{{data.email}}" ngModel (ngModelChange)="onUserDataChange($event, 'email')">
            </div>
            <div class="grid-item">
              <input type="tel" class="form-control" id="phone" name="phone" placeholder="{{data.phone}}" ngModel (ngModelChange)="onUserDataChange($event, 'phone')">
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``
})
export class EditUserComponent {

  //passaggio dati
  @Input() data: UserModel | undefined;
  @Input() users: UserModel[] = [];
  @Input() userToUpdate: UserModel | null = null;
  @Input() userToSelect: any;
  @Output() userDataChanged = new EventEmitter<{ field: string, value: any }>();

  constructor(private jsonPlaceholder: JsonPlaceholderService, private toastr: ToastrService) {}

  editUserForm(editUserValue: any, data: UserModel) {
    if (editUserValue && editUserValue.valid) {
      //creazione utente modificato
      const updatedUser: UserModel = {
        id: data.id,
        name: editUserValue.value.name,
        username: editUserValue.value.username,
        email: editUserValue.value.email,
        phone: editUserValue.value.phone
      };
      this.jsonPlaceholder.editUser(data.id, updatedUser).subscribe((updatedUser: UserModel) => {
        // Aggiorna la lista
        this.users = this.users.map(u => (u.id === updatedUser.id ? updatedUser : u));
      });
    }

  }

  //evento dati cambiati in comunicazione con home
  onUserDataChange(value: any, field: string) {
    this.userDataChanged.emit({ field, value });
  }

}
