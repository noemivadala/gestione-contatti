import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

//stato autenticazione
export interface AuthState {
  isLoggedIn: boolean;
  error: string | null;
}

//stato iniziale impostato a false
export const initialState: AuthState = {
  isLoggedIn: false,
  error: null
};

//variabile globale
export let IsLog = false;

//cambio stato
const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, state => {
      // imposta a true se è autenticato
      IsLog = true;
      // ritorna un nuovo stato
      return { state, isLoggedIn: true, error: null };
  }),
  on(AuthActions.loginFailure, (state, { error }) => {
      // azione di login fallito
      return { ...state, isLoggedIn: false, error };
  })
);

export interface AppState {
    auth: AuthState; // contiene lo stato dell'autenticazione
}

//funzione che funge da reducer per l'autenticazione
export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action);
}
