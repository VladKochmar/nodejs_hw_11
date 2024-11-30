class ProductValidator {
  static productSchema = {
    title: {
      notEmpty: {
        errorMessage: 'Title is required',
      },
      isLength: {
        options: { min: 2 },
        errorMessage: 'Title must be at least 2 characters long',
      },
      trim: true,
      escape: true,
    },
    price: {
      isNumeric: {
        errorMessage: 'Price must be a number',
      },
      notEmpty: {
        errorMessage: 'Price is required',
      },
      custom: {
        options: value => value >= 0,
        errorMessage: 'Price must be greater than or equal to 0',
      },
    },
    description: {
      isLength: {
        options: { max: 500 },
        errorMessage: 'Description must be at most 500 characters long',
      },
      isString: {
        errorMessage: 'Description must be a string',
      },
      optional: { options: { nullable: true } },
      trim: true,
      escape: true,
    },
    image: {
      notEmpty: {
        errorMessage: 'Image is required',
      },
      trim: true,
      escape: true,
    },
  }
}

export default ProductValidator
