import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String },
  team: { type: String },
  driver: { type: String },
  price: {type: String},
  stock: {type: String},
  colors: [{ type: String }],
  description:{type:String},
  sizes: [{ type: String }],
  details:[{ type: String }],
  image: {type:String},
  categories: [{type: Schema.Types.ObjectId,ref: "Category"}]
});

export default mongoose.model("Product", productSchema, "Products");




