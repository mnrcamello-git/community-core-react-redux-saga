import {
  changeNewPassword,
  changeConfirmPassword,
  validateNewPassword,
  validateConfirmPassword,
  resetPasswordRequested,
  resetPasswordSuccess,
  resetPasswordFailed,
} from '../actions';
import {
  CHANGE_NEW_PASSWORD,
  CHANGE_CONFIRM_PASSWORD,
  VALIDATE_NEW_PASSWORD,
  VALIDATE_CONFIRM_PASSWORD,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../constants';

describe('ResetPasswordPage actions', () => {
  describe('Change New Password Action', () => {
    it('has a type of CHANGE_NEW_PASSWORD', () => {
      const expected = {
        type: CHANGE_NEW_PASSWORD,
        new_password: 'new_password',
      };
      expect(changeNewPassword('new_password')).toEqual(expected);
    });
  });
});

describe('ResetPasswordPage actions', () => {
  describe('Change Confirm Password Action', () => {
    it('has a type of CHANGE_CONFIRM_PASSWORD', () => {
      const expected = {
        type: CHANGE_CONFIRM_PASSWORD,
        confirm_password: 'confirm_password',
      };
      expect(changeConfirmPassword('confirm_password')).toEqual(expected);
    });
  });
});

describe('ResetPasswordPage actions', () => {
  describe('Validate New Password Action', () => {
    it('has a type of VALIDATE_NEW_PASSWORD', () => {
      const expected = {
        type: VALIDATE_NEW_PASSWORD,
        message: '',
        buttonDisabled: false,
        new_password: '',
      };
      expect(validateNewPassword('', '', false)).toEqual(expected);
    });
  });
});

describe('ResetPasswordPage actions', () => {
  describe('Validate Confirm Password Action', () => {
    it('has a type of VALIDATE_CONFIRM_PASSWORD', () => {
      const expected = {
        type: VALIDATE_CONFIRM_PASSWORD,
        message: '',
        buttonDisabled: false,
        new_password: '',
      };
      expect(validateConfirmPassword('', '', false)).toEqual(expected);
    });
  });
});

describe('resetPasswordPage actions', () => {
  describe('reset Password Requested', () => {
    it('has a type of resetPasswordRequested', () => {
      const expected = {
        type: RESET_PASSWORD_REQUESTED,
        message: '',
      };
      expect(resetPasswordRequested()).toEqual(expected);
    });
  });
});

describe('resetPasswordPage actions', () => {
  describe('reset Password Success', () => {
    it('has a type of resetPasswordSuccess', () => {
      const expected = {
        type: RESET_PASSWORD_SUCCESS,
        message: '',
      };
      expect(resetPasswordSuccess('')).toEqual(expected);
    });
  });
});

describe('resetPasswordPage actions', () => {
  describe('reset Password Failed', () => {
    it('has a type of resetPasswordFailed', () => {
      const expected = {
        type: RESET_PASSWORD_FAILED,
        message: '',
      };
      expect(resetPasswordFailed('')).toEqual(expected);
    });
  });
});
