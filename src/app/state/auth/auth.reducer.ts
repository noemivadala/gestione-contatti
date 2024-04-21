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

export let IsLog = false;

//cambio stato
const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, state => {
      // login con successo
      console.log('Reducer: loginSuccess action dispatched');
      // var guard
      IsLog = true;
      return { state, isLoggedIn: true, error: null };
  }),
  on(AuthActions.loginFailure, (state, { error }) => {
      // login con fallimento
      console.log('Reducer: loginFailure action dispatched');
      return { ...state, isLoggedIn: false, error };
  })
);

export interface AppState {
    auth: AuthState;
}

export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action);
}
