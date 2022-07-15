import { Action, createReducer } from '@ngrx/store';

export interface AppState {
  name: string
}

export const initialState: AppState = {
  name: 'ngrx-training'
};

export const appReducer = createReducer(
  initialState,
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
