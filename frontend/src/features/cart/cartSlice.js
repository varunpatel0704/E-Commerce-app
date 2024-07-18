import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subTotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  coupon: "",
};

const tax = 0.18;
const minimumValue = 1000;
const shippingCharges = 200;

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: {
      reducer(state, action) {
        const { product, qty } = action.payload;
        // check if the product was already added to cart. if so, add the the provided qty otherwise add the product as new item.
        const cartItem = state.cartItems.find(
          (item) => item.product._id === product._id
        );
        if (cartItem) {
          cartItem.qty = qty;
        } else {
          state.cartItems.push({ product, qty });
        }
      },
      prepare(product, qty) {
        return {
          payload: {
            product,
            qty,
          },
        };
      },
    },

    calculateCartValue(state, action) {
      const subTotal = state.cartItems.reduce(
        (total, {product, qty}) => total + Number(product.price) * Number(qty),
        0
      );

      state.subTotal = subTotal;
      state.shippingCharges =
        state.subTotal > minimumValue ? 0 : shippingCharges;

      state.tax = Math.round(state.subTotal * tax);
      state.total =
        state.subTotal + state.tax + state.shippingCharges - state.discount;
    },

    applyDiscount(state, action){
      state.discount = action.payload;
    },
    
    removeFromCart(state, action){
      const product = action.payload;
      // filter the cartItems array.
      state.cartItems = state.cartItems.filter(item=>item.product._id !== product._id);
    },

    resetCart(state, action){
      state = initialState;
    }
  },
});

export const {addToCart, removeFromCart, calculateCartValue, applyDiscount} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;

