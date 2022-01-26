import {
  changeEmail,
  validateEmail,
  forgotPasswordRequested,
  forgotPasswordSuccess,
  forgotPasswordFailed,
} from '../actions';
import {
  CHANGE_EMAIL,
  VALIDATE_EMAIL,
  FORGOT_PASSWORD_REQUESTED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from '../constants';

describe('ForgotPasswordPage actions', () => {
  describe('Change Email', () => {
    it('has a type of changeEmail', () => {
      const expected = {
        type: CHANGE_EMAIL,
        email: 'test@penbrothers.com',
      };
      expect(changeEmail()).toEqual(expected);
    });
  });
});

describe('ForgotPasswordPage actions', () => {
  describe('Validate Email', () => {
    it('has a type of validateEmail', () => {
      const expected = {
        type: VALIDATE_EMAIL,
        email: 'test@penbrothers.com',
        message: '',
        buttonDisabled: false,
      };
      expect(validateEmail()).toEqual(expected);
    });
  });
});

describe('ForgotPasswordPage actions', () => {
  describe('Forgot Password Requested', () => {
    it('has a type of forgotPasswordRequested', () => {
      const expected = {
        type: FORGOT_PASSWORD_REQUESTED,
        message: '',
      };
      expect(forgotPasswordRequested()).toEqual(expected);
    });
  });
});

describe('ForgotPasswordPage actions', () => {
  describe('Forgot Password Success', () => {
    it('has a type of forgotPasswordSuccess', () => {
      const expected = {
        type: FORGOT_PASSWORD_SUCCESS,
        message: 'Please check your email for reset password link',
      };
      expect(forgotPasswordSuccess()).toEqual(expected);
    });
  });
});

describe('ForgotPasswordPage actions', () => {
  describe('Forgot Password Failed', () => {
    it('has a type of forgotPasswordFailed', () => {
      const expected = {
        type: FORGOT_PASSWORD_FAILED,
        message: 'Email address is not registered.',
      };
      expect(forgotPasswordFailed()).toEqual(expected);
    });
  });
});
