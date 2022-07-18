import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {State} from "./reducers";
import {getAppName} from "./store/app/app.selectors";
import {Observable} from "rxjs";
import {upperCaseName} from "./store/app/app.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name$: Observable<string>;

  constructor(private router: Router, private store: Store<State>) {
    this.name$ = this.store.select(getAppName);
  }

  uppercaseAppName(newName: string) {
    this.store.dispatch(upperCaseName({name: newName}))
  }

  lowercaseAppName(newName: string) {
    //TODO as exercise
  }

  reverseAppName(newName: string) {
    //TODO as exercise
  }

  redirect() {
    this.router.navigate(['users']);
  }
}
