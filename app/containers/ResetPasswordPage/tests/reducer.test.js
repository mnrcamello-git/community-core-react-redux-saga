// import produce from 'immer';
import resetPasswordPageReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('resetPasswordPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      userData: {
        user_id: '',
        new_password: '',
        confirm_password: '',
      },
      ui: {
        loading: false,
        errorMessage: '',
        buttonDisabled: true,
      },
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(resetPasswordPageReducer(undefined, {})).toEqual(expectedResult);
  });
});
