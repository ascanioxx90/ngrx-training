import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from "../../services/user.service";
import {loadUsers, loadUsersFailure, loadUsersSuccess} from "./user.actions";
import {exhaustMap, map, of} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private service: UserService) {
  }

  public loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    exhaustMap(_action => this.service.getUsers().pipe(
        map((users: string[]) => loadUsersSuccess({users})),
        catchError((error) => of(loadUsersFailure({error})))
      ),
    ),
  ));
}
