import mongoose from "mongoose";

const Schema = mongoose.Schema;

const currencySetter = (v) => typeof v === 'string' ? parseFloat(v.replace(/[^\d.-]/g, "")) * 100 : v;
const currencyGetter = (v) => v / 100;

const ProductSchema = new Schema(
  {
    price: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
    expense: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
