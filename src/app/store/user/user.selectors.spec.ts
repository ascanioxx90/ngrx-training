import {UsersState} from "./user.reducer";
import {getUsers, selectUsers} from "./user.selectors";
import {State} from "../../reducers";


describe('User Selectors', () => {
  it('should select the feature state', () => {
    const initialState: UsersState = {
      users: []
    }
    const result = getUsers.projector(initialState);
    expect(result).toStrictEqual([]);
  });

  it('should select the feature from root state', () => {
    const initialState: State = {
      app: { name: '' },
      users: {users: []}
    }
    const result = selectUsers(initialState);
    expect(result).toStrictEqual({users: []});
  });
});
