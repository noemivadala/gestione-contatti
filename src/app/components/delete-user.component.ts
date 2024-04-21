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
        <h5 id="offcanvasRightLabel">Sei sicuro di voler eliminare {{ data }}</h5>
        <p>
          
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

  @Input() data: any;

  ngOnInit(): void {
  }


  constructor(private jsonPlaceholder: JsonPlaceholderService){}


}
