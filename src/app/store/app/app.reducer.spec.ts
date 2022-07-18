import {AppState, initialState, reducer} from './app.reducer';
import {upperCaseName} from "./app.actions";

describe('App Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('uppecaseName action', () => {
    it('it should to uppercase the current appName', () => {
      const initialState = {name: 'app name'};
      const newState: AppState = {name: 'APP NAME'}
      const action = upperCaseName({name: 'app name'});
      const state = reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });
});
