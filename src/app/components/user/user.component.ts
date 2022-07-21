import {Component} from '@angular/core';
import {Observable, tap} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../../reducers";
import {loadUsers} from "../../store/user/user.actions";
import {getUsers} from "../../store/user/user.selectors";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users$: Observable<string[]>;

  constructor(private store: Store<State>) {
    this.users$ = this.store.pipe(
      select(getUsers),
      tap(users => users.length === 0 && this.store.dispatch(loadUsers())),
    )
  }

  reload() {
    this.store.dispatch(loadUsers());
  }
}
