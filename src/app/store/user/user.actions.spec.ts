import * as fromUser from './user.actions';

describe('loadUsers', () => {
  it('it should return defined users Actions', () => {
    expect(fromUser.loadUsers().type).toBe('[User] Load Users');
    expect(fromUser.loadUsersSuccess({users: []}).type).toBe('[User] Load Users Success');
    expect(fromUser.loadUsersFailure({error: null}).type).toBe('[User] Load Users Failure');
  });
});
