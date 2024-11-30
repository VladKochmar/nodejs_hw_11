class UserValidator {
  static userSchema = {
    email: {
      notEmpty: {
        errorMessage: 'Email is required',
      },
      isEmail: {
        errorMessage: 'Invalid email address',
      },
      normalizeEmail: true,
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
    username: {
      notEmpty: {
        errorMessage: 'Name is required',
      },
      isLength: {
        options: { min: 2 },
        errorMessage: 'Username must be at least 2 characters long',
      },
      trim: true,
      escape: true,
    },
  }
}

export default UserValidator
