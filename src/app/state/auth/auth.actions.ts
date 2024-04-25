import { createAction, props } from "@ngrx/store";

// Azione per richiedere il login
export const requestLogin = createAction(
    '[Auth] Login request', //tipo azione
    props<{ credentials: { username: string, password: string } }>() //credenziali dell'utente
);

// Azione per indicare il successo del login
export const loginSuccess = createAction(
    '[Auth] Login success' //tipo azione
);

// Azione per indicare il fallimento del login
export const loginFailure = createAction(
    '[Auth] Login failure', //tipo azione
    props<{ error: string } >()
);