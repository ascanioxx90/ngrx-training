import {Spectator, createComponentFactory, byText} from '@ngneat/spectator';
import {AppComponent} from "./app.component";
import {ChildrenOutletContexts, Router, RouterModule} from "@angular/router";
import {provideMockStore} from "@ngrx/store/testing";

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
    mocks: [Router, ChildrenOutletContexts]
  });

  beforeEach(() => spectator = createComponent());

  it('should exist', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should have a default name',  (done) => {
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
    expect(spectator.query('button')?.innerHTML).toBe('Show Users');
  });

  it('should redirect to users page on <button> "Go to Users List" click ', async () => {
    const router = spectator.inject<Router>(Router);
    spectator.fixture.detectChanges();
    spectator.click(byText('Show Users'));
    expect(router.navigate).toHaveBeenCalledWith(['users']);
  });
});
