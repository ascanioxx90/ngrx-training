import {State} from "../../reducers";
import {createSelector} from "@ngrx/store";
import {UsersState} from "./user.reducer";

export const selectUsers = (state: State) => state.users;

export const getUsers = createSelector(selectUsers, (usersState: UsersState) => usersState.users);
