import { createAction, props } from "@ngrx/store";

export const requestLogin = createAction(
    '[Auth] Login request',
    props<{ credentials: { username: string, password: string } }>()
);

export const loginSuccess = createAction(
    '[Auth] Login success'
);

export const loginFailure = createAction(
    '[Auth] Login failure',
    props<{ error: string } >()
);