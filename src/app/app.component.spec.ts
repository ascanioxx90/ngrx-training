import {byText, createComponentFactory, Spectator} from '@ngneat/spectator';
import {AppComponent} from "./app.component";
import {ChildrenOutletContexts, Router, RouterModule} from "@angular/router";
import {provideMockStore} from "@ngrx/store/testing";
import {Store} from "@ngrx/store";
import {upperCaseName} from "./store/app/app.actions";

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const initialState = {
    app: {
      name: 'ngrx-training-test'
    }
  };
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [RouterModule],
    providers: [provideMockStore({initialState})],
    mocks: [Router, ChildrenOutletContexts],
  });

  beforeEach(() => spectator = createComponent());

  it('should exist', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should have a default name', (done) => {
    expect(spectator.component.name$.subscribe(name => {
      expect(name).toBe('ngrx-training-test');
      done();
    }));
  });

  it('should output a <p> with "Name: {{ defaultName }}!"', () => {
    spectator.fixture.detectChanges();
    expect(spectator.query('p')?.innerHTML).toBe('Name: ngrx-training-test!');
  });

  it('should output a <button> with "Go to Users List"', () => {
    spectator.fixture.detectChanges();
    expect(spectator.queryAll('button')[3]?.innerHTML).toBe('Show Users');
  });

  it('should redirect to users page on <button> "Go to Users List" click ', async () => {
    const router = spectator.inject<Router>(Router);
    spectator.fixture.detectChanges();
    spectator.click(byText('Show Users'));
    expect(router.navigate).toHaveBeenCalledWith(['users']);
  });

  it('should uppercase app name after "uppercase" button click', () => {
    const store = spectator.inject(Store);
    jest.spyOn(store, 'dispatch');
    spectator.component.uppercaseAppName('ngrx-training-test');
    spectator.fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(upperCaseName({name: 'ngrx-training-test'}));
  });
});
