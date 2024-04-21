import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { JsonPlaceholderService } from '../service/json-placeholder.service';
import { UserModel } from '../../assets/user.model';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  template: `

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Sei sicuro di voler eliminare</h5>
        <p *ngIf="userId">
          ID dell'utente selezionato: {{ userId }}
        </p>
        <button class="btn-delete"><i class="fa-regular fa-trash-can fa-sm"></i></button>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        ...
      </div>
    </div>

  `,
  styles: ``
})
export class DeleteUserComponent {

  @Input() getUserById: any;

  userId: number | null = null;

  ngOnInit(): void {
  }


  constructor(private jsonPlaceholder: JsonPlaceholderService){}


}
