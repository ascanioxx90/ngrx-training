import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as appReducer from "../store/app/app.reducer";

export interface State {
  app: appReducer.AppState
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
