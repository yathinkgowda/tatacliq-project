// cartReducer.js (updated)
const initialState = {
  cartItems: [],
  cartCounter: 0,
  totalPrice: 0,
  deliveryCharges: 50,
  taxes: 0,
  grandTotal: 0,
};

const cartReducer = (state = initialState, action) => {
  console.log(action,"actionactionaction",state)
  switch (action.type) {
    case 'ADD_TO_CART': {
      if (!action.payload || typeof action.payload.newPrice !== 'number') {
        console.error('ADD_TO_CART: Invalid payload', action.payload);
        return state;
      }

      // Use MongoDB _id instead of id
      const existingIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
      let updatedCartItems;
      if (existingIndex !== -1) {
        updatedCartItems = state.cartItems.map((item) => {
          if (item._id === action.payload._id) {
            const newQuantity = item.quantity + 1;
            return {
              ...item,
              quantity: newQuantity,
              total_item_price: newQuantity * item.newPrice
,
            };
          }
          return item;
        });
      } else {
        updatedCartItems = [
          ...state.cartItems,
          {
            ...action.payload,
            quantity: 1,
            total_item_price: action.payload.newPrice
,
          }
        ];
      }

      const newCartCounter = state.cartCounter + 1;
      const newTotalPrice = updatedCartItems.reduce((acc, item) => acc + item.total_item_price, 0);
      const newTaxes = newTotalPrice * 0.18;
      const newGrandTotal = newTotalPrice + newTaxes + state.deliveryCharges;
console.log(state,"statestatestatestate")
      return {
        ...state,
        cartItems: updatedCartItems,
        cartCounter: newCartCounter,
        totalPrice: newTotalPrice,
        taxes: newTaxes,
        grandTotal: newGrandTotal,
      };
    }

    case 'REMOVE_FROM_CART': {
      const itemToRemove = state.cartItems.find(item => item._id === action.payload._id);
      if (!itemToRemove) return state;

      const updatedCartItems = state.cartItems.filter(item => item._id !== action.payload._id);
      const newCartCounter = state.cartCounter - itemToRemove.quantity;
      const newTotalPrice = updatedCartItems.reduce((acc, item) => acc + item.total_item_price, 0);
      const newTaxes = newTotalPrice * 0.18;
      const newGrandTotal = newTotalPrice + newTaxes + state.deliveryCharges;

      return {
        ...state,
        cartItems: updatedCartItems,
        cartCounter: newCartCounter,
        totalPrice: newTotalPrice,
        taxes: newTaxes,
        grandTotal: newGrandTotal,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;