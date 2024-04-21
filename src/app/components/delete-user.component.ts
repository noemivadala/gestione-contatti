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
        <button type="button" class="btn btn-light mr-2" data-bs-dismiss="offcanvas">Annulla</button>
        <button type="button" class="btn btn-danger"><i class="fa-regular fa-trash-can fa-sm"></i> Conferma l'eliminazione</button>
      </div>
    </div>

  `,
  styles: ``
})
export class DeleteUserComponent {

  @Input() data: UserModel | undefined;

  ngOnInit(): void {
  }


  constructor(private jsonPlaceholder: JsonPlaceholderService){}


}
