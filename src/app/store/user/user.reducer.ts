import {Action, createReducer, on} from '@ngrx/store';
import {loadUsersFailure, loadUsersSuccess} from "./user.actions";


export interface UsersState {
  users: string[];
}

export const initialState: UsersState = {
  users: []
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, action) => ({...state, users: action.users})),
  on(loadUsersFailure, (state) => ({...state, users: state.users}))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return userReducer(state, action);
}
