import {Action, createReducer, on} from '@ngrx/store';
import {upperCaseName} from "./app.actions";

export interface AppState {
  name: string
}

export const initialState: AppState = {
  name: 'ngrx-training'
};

export const appReducer = createReducer(
  initialState,
  on(upperCaseName, state => ({...state, name: state.name.toUpperCase()})),
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
