import produce from 'immer';
import loginPageReducer from '../reducer';
import {
  changeEmail,
  changePassword,
  loginRequested,
  loginSuccess,
  loginFailed,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('loginPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      userData: {
        email: '',
        password: '',
      },
      ui: {
        loading: false,
        errorMessage: '',
        buttonDisabled: false,
      },
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(loginPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle change email correctly', () => {
    const email = 'galo@penbrothers.com';
    const errorMessage = '';
    const expectedResult = produce(state, draft => {
      draft.userData.email = email;
      draft.ui.errorMessage = errorMessage;
    });

    expect(loginPageReducer(state, changeEmail(email))).toEqual(expectedResult);
  });

  it('should handle change password correctly', () => {
    const password = 'password';
    const errorMessage = '';
    const expectedResult = produce(state, draft => {
      draft.userData.password = password;
      draft.ui.errorMessage = errorMessage;
    });

    expect(loginPageReducer(state, changePassword(password))).toEqual(
      expectedResult,
    );
  });

  it('should handle login request correctly', () => {
    const buttonDisabled = true;
    const errorMessage = '';
    const loading = true;

    const expectedResult = produce(state, draft => {
      draft.ui.loading = loading;
      draft.ui.buttonDisabled = buttonDisabled;
      draft.ui.errorMessage = '';
    });

    expect(loginPageReducer(state, loginRequested(errorMessage))).toEqual(
      expectedResult,
    );
  });

  it('should handle login success correctly', () => {
    const loading = false;
    const buttonDisabled = false;

    const expectedResult = produce(state, draft => {
      draft.ui.loading = loading;
      draft.ui.buttonDisabled = buttonDisabled;
    });

    expect(loginPageReducer(state, loginSuccess())).toEqual(expectedResult);
  });

  it('should handle login failed correctly', () => {
    const loading = false;
    const errorMessage = 'Failed';
    const buttonDisabled = false;

    const expectedResult = produce(state, draft => {
      draft.ui.loading = loading;
      draft.ui.errorMessage = errorMessage;
      draft.ui.buttonDisabled = buttonDisabled;
    });

    expect(loginPageReducer(state, loginFailed(errorMessage))).toEqual(
      expectedResult,
    );
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
