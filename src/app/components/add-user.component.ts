import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [],
  template: `
      <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
          <h5 id="offcanvasTopLabel">Aggiungi contatti</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="d-flex justify-content-center">
          <form>
            <input type="text" name="name" placeholder="Nome" ngModel required>
            <input type="text" name="username" placeholder="Cognome" ngModel required>
            <input type="email" name="email" placeholder="Email" ngModel required>
            <input type="tel" name="phone" placeholder="Telefono" ngModel required>
            <button type="submit">Aggiungi contatto</button>
          </form>
        </div>
      </div>
  `,
  styles: ``
})
export class AddUserComponent {

}
