import {getAppName} from "./app.selectors";
import {AppState} from "./app.reducer";
import {State} from "../../reducers";


describe('App Selectors', () => {
  it('should select the app name', () => {
    const initialState: State = {
      app: {
        name: 'ngrx-training'
      }
    }
    const result = getAppName.projector(initialState.app);
    expect(result).toBe('ngrx-training');
  });
});
