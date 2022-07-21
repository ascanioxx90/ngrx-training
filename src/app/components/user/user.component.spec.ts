import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {UserComponent} from "./user.component";
import {provideMockStore} from "@ngrx/store/testing";
import {Store} from "@ngrx/store";
import {loadUsers} from "../../store/user/user.actions";

describe('UserComponent', () => {
  let spectator: Spectator<UserComponent>;
  const initialState = {
    users: { users: ['Stefano', 'Aurora', 'Daniela', 'Toto'] }
  };
  const createComponent = createComponentFactory({
    component: UserComponent,
    providers: [provideMockStore({initialState})],
  });

  beforeEach(() => spectator = createComponent());

  it('should exist', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should render 4 users as list item', () => {
    const result = ['Stefano', 'Aurora', 'Daniela', 'Toto'];
    spectator.fixture.detectChanges();
    spectator
      .queryAll('li')
      .map(li => li.textContent)
      .forEach((li, index) => expect(li).toBe(result[index]));
  });

  // it('should dispatch LoadUser action on empty initial state', (done) => {
  //   const store = spectator.inject(Store);
  //   initialState.users.users = [];
  //   jest.spyOn(store, 'select').mockReturnValue(of([]));
  //   jest.spyOn(store, 'dispatch');
  //   expect(store.dispatch).toHaveBeenCalledWith(loadUsers());
  // });

  it('should not dispatch LoadUser action with preloaded users', () => {
    const store = spectator.inject(Store);
    jest.spyOn(store, 'dispatch');
    spectator.fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should dispatch LoadUser on reload method invocation', () => {
    const store = spectator.inject(Store);
    jest.spyOn(store, 'dispatch');
    spectator.fixture.detectChanges();
    spectator.component.reload();
    expect(store.dispatch).toHaveBeenCalledWith(loadUsers());
  });
});
