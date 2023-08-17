
import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
  productname:{
    type : String,
    unique : true
  },
  category:String,
  image:String,
  price:Number,
  description:String
});

const Products = mongoose.models.Products || mongoose.model('Products', ProductsSchema);

export default Products;