import { checkIfResponseIsSuccess, validateEmail } from '../globalHelpers';

describe('checkIfResponseIsSuccess()', () => {
  it('returns true if string is SUCCESS', () => {
    expect(checkIfResponseIsSuccess('SUCCESS')).toEqual(true);
  });
  it('returns false if string is anything but SUCCESS', () => {
    expect(checkIfResponseIsSuccess('sdhjashao')).toEqual(false);
  });
});

describe('validateEmail()', () => {
  it('returns true if email is valid', () => {
    expect(validateEmail('galo@penbrothers.com')).toEqual(true);
  });
  it('returns false if email is not an actual email', () => {
    expect(validateEmail('sdhjashao')).toEqual(false);
  });
});
