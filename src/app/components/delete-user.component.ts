import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JsonPlaceholderService } from '../service/json-placeholder.service';
import { UserModel } from '../../assets/user.model';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  template: `

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <h5 id="offcanvasRightLabel">Sei sicuro di voler eliminare<br>{{ data?.name }}?</h5>
        <!-- bottoni conferma e annulla -->
        <button type="button" class="btn btn-light" data-bs-dismiss="offcanvas">Annulla</button>
        <button type="button" class="btn btn-danger" (click)="confirmDeleteUser()"><i class="fa-regular fa-trash-can fa-sm"></i> Conferma l'eliminazione</button>
      </div>
    </div>

  `,
  styles: ``
})
export class DeleteUserComponent {

  //passaggio dati
  @Input() data: UserModel | undefined;
  @Output() deleteConfirmed = new EventEmitter<number>();

  constructor(private jsonPlaceholder: JsonPlaceholderService){}

  //conferma eliminazione
  confirmDeleteUser() {
    if (this.data) {
      //passa il dato e conferma l'evento
      this.deleteConfirmed.emit(this.data.id);
      this.hiddenCanvas();
    }
  }

  //nascondi classi al click di confirmDeleteUser
  private hiddenCanvas() {
    const offcanvasElement = document.getElementById('offcanvasRight');
    const backdropElement = document.querySelector('.offcanvas-backdrop.fade.show');
    if (offcanvasElement && backdropElement) {
      offcanvasElement.classList.toggle('show');
      offcanvasElement.removeAttribute('aria-modal');
      backdropElement.remove();
    }
  }
}
