// import produce from 'immer';
import forgotPasswordPageReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('forgotPasswordPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      userData: {
        email: '',
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
    expect(forgotPasswordPageReducer(undefined, {})).toEqual(expectedResult);
  });
});
