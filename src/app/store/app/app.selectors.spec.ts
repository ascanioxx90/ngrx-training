import {getAppName} from "./app.selectors";
import {AppState} from "./app.reducer";


describe('App Selectors', () => {
  it('should select the app name', () => {
    const initialState: AppState = {
        name: 'ngrx-training'
    }
    const result = getAppName.projector(initialState);
    expect(result).toBe('ngrx-training');
  });
});
