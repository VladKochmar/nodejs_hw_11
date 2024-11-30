import mongoose from 'mongoose'
const { Schema } = mongoose

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [50, 'Title must be at most 50 characters long'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'The price should be no later than 1990'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description must be at most 50 characters long'],
    trim: true,
  },
})

const Product = mongoose.model('Product', productSchema)
export default Product
