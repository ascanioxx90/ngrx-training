import * as fromApp from './app.actions';

describe('upperCaseName', () => {
  it('should return an action', () => {
    expect(fromApp.upperCaseName({name: 'upperCaseName'}).type).toBe('[App] Uppercase Name');
  });
});
