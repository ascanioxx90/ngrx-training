import {initialState, reducer, UsersState} from './user.reducer';
import {loadUsersFailure, loadUsersSuccess} from "./user.actions";

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadUsersSuccess action', () => {
    it('should return fetched Users', () => {
      const initialState = {users: []};
      const users = ['Homer', 'Marge', 'Bart', 'Lisa', 'Maggie'];
      const newState: UsersState = { users }
      const action = loadUsersSuccess({users});
      const state = reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('loadUsersFailure action', () => {
    it('should return empty array', () => {
      const initialState = {users: []};
      const users: string[] = [];
      const newState: UsersState = { users }
      const action = loadUsersFailure({error: null});
      const state = reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });
});
