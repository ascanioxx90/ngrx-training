import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as appReducer from "../store/app/app.reducer";
import * as userReducer from "../store/user/user.reducer";

export interface State {
  app: appReducer.AppState
  users: userReducer.UsersState
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer.reducer,
  users: userReducer.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
