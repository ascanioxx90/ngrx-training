import {createAction, props} from '@ngrx/store';

export const upperCaseName = createAction(
  '[App] Uppercase Name',
  props<{name: string}>()
);




