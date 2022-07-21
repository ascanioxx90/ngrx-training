import {UsersState} from "./user.reducer";
import {getUsers} from "./user.selectors";


describe('User Selectors', () => {
  it('should select the feature state', () => {
    const initialState: UsersState = {
      users: []
    }
    const result = getUsers.projector(initialState);
    expect(result).toStrictEqual([]);
  });
});
