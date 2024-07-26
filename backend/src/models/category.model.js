import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    default: 'miscellaneous',
    lowercase: true,
    required: [true, 'category name is required']
  },
  image: {
    type: String,
    required: [true, 'category image is required']
  },
  products:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]


}, {timestamps : true});

const Category = mongoose.model('Category', categorySchema);

export default Category;