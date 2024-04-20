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
  on(AuthActions.loginSuccess, state => {
      console.log('Reducer: loginSuccess action dispatched');
      return { state, isLoggedIn: true, error: null };
  }), // login con successo
  on(AuthActions.loginFailure, (state, { error }) => {
      console.log('Reducer: loginFailure action dispatched');
      return { ...state, isLoggedIn: false, error };
  }) // login con fallimento
);

export interface AppState {
    auth: AuthState;
}

export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action);
}
