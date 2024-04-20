import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  error: string | null;
}

//stato iniziale impostato a false
export const initialState: AuthState = {
  isLoggedIn: false,
  error: null
};

//cambio stato
const _authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, state => ({ ...state, isLoggedIn: true, error: null })), // Azione login con successo
    on(AuthActions.loginFailure, (state, { error }) => ({ ...state, isLoggedIn: false, error })) // Azione login con fallimento
)

export interface AppState {
    auth: AuthState;
}

export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action);
}
