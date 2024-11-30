class AuthValidator {
  static authSchema = {
    email: {
      notEmpty: {
        errorMessage: 'Email is required',
      },
      isEmail: {
        errorMessage: 'Invalid email address',
      },
      normalizeEmail: true,
      trim: true,
      escape: true,
    },
    password: {
      notEmpty: {
        errorMessage: 'Password is required',
      },
      isLength: {
        options: { min: 6 },
        errorMessage: 'Password must be at least 6 characters long',
      },
      trim: true,
      escape: true,
    },
  }
}

export default AuthValidator
