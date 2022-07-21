import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of, throwError} from 'rxjs';

import {UserEffects} from './user.effects';
import {createServiceFactory, SpectatorService} from "@ngneat/spectator";
import {UserService} from "../../services/user.service";
import {loadUsers, loadUsersFailure, loadUsersSuccess} from "./user.actions";

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let spectator: SpectatorService<UserEffects>;
  const createService = createServiceFactory({
    service: UserEffects,
    providers: [
      UserEffects,
      provideMockActions(() => actions$)
    ],
    mocks: [UserService],
  });

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should fetch User on Success Action', (done) => {
    const userService = spectator.inject(UserService);
    userService.getUsers.andReturn(of(['STEFANO', 'AURORA', 'DANIELA', 'TOTO']));
    actions$ = of(loadUsers());
    spectator.service.loadUsers$.subscribe(action => {
      expect(action).toEqual(loadUsersSuccess({users: ['STEFANO', 'AURORA', 'DANIELA', 'TOTO']}));
      done();
    });
  });

  it('should fetch empty array on Failure Action', (done) => {
    const userService = spectator.inject(UserService);
    userService.getUsers.andReturn(throwError(() => new Error()));
    actions$ = of(loadUsers());
    spectator.service.loadUsers$.subscribe(action => {
      expect(action).toEqual(loadUsersFailure({error: new Error()}));
      done();
    });
  });
});
