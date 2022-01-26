import {
  changeEmail,
  changePassword,
  loginRequested,
  loginFailed,
  loginSuccess,
} from '../actions';
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from '../constants';

describe('LoginPage actions', () => {
  describe('Change Email Action', () => {
    it('should return the correct type and passed email', () => {
      const email = 'galo@penbrothers.com';
      const expected = {
        type: CHANGE_EMAIL,
        email,
      };
      expect(changeEmail(email)).toEqual(expected);
    });
  });

  describe('Change Password Action', () => {
    it('should return the correct type and passed password', () => {
      const password = '1234';
      const expected = {
        type: CHANGE_PASSWORD,
        password,
      };
      expect(changePassword(password)).toEqual(expected);
    });
  });

  describe('Login Requested Action', () => {
    it('should return the correct type and passed message', () => {
      const message = '';
      const expected = {
        type: LOGIN_REQUESTED,
        message,
      };
      expect(loginRequested(message)).toEqual(expected);
    });
  });

  describe('Login Failed Action', () => {
    it('should return the correct type and passed message', () => {
      const message = 'failed';
      const expected = {
        type: LOGIN_FAILED,
        message,
      };
      expect(loginFailed(message)).toEqual(expected);
    });
  });

  describe('Login Success Action', () => {
    it('should return the correct type', () => {
      const expected = {
        type: LOGIN_SUCCESS,
      };
      expect(loginSuccess()).toEqual(expected);
    });
  });
});
