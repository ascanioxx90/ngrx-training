import {createSelector,} from '@ngrx/store';
import {State} from "../../reducers";
import {AppState} from "./app.reducer";

export const selectAppName = (state: State) => state.app;

export const getAppName = createSelector(selectAppName, (appState: AppState) => appState.name);
