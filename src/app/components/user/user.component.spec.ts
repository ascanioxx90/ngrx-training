import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {UserComponent} from "./user.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Store} from "@ngrx/store";
import {loadUsers} from "../../store/user/user.actions";
import {getUsers} from "../../store/user/user.selectors";

describe('UserComponent', () => {
  let spectator: Spectator<UserComponent>;
  const initialState = {
    users: { users: [] }
  };
  const createComponent = createComponentFactory({
    component: UserComponent,
    providers: [provideMockStore({initialState, selectors: [{selector: getUsers, value: ['Stefano', 'Aurora', 'Daniela', 'Toto']}]})],
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

  it('should load 4 users from selector on empty initial state', (done) => {
    spectator.component.users$.subscribe(users => {
      expect(users).toEqual(['Stefano', 'Aurora', 'Daniela', 'Toto']);
      done();
    });
  });

  it('should dispatch LoadUser action on empty initial state', (done) => {
    const store = spectator.inject(MockStore);
    store.overrideSelector(getUsers, () => [] )
    jest.spyOn(store, 'dispatch');
    spectator.component.users$.subscribe(users => {
      expect(store.dispatch).toHaveBeenCalledWith(loadUsers())
      done();
    });
  });

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
