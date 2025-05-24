const initialState = {
  cartItems: [],
  cartCounter: 0,
  totalPrice: 0,
  deliveryCharges: 50,
  taxes: 0,
  grandTotal: 0,
};

const cartReducer = (state = initialState, action) => {
  console.log(state,"statestate",action)
  switch (action.type) {
    case 'ADD_TO_CART': {
      if (!action.payload || typeof action.payload.newPrice !== 'number' ) {
        console.error('Invalid cart item payload');
        return state;
      }

      const quantity = Math.max(Number(action.payload.quantity) || 1, 1);
      const size = action.payload.size;
      const _id = action.payload._id;

      const existingIndex = state.cartItems.findIndex(
        item => item._id === _id 
      );

      let updatedItems = [...state.cartItems];
      
      if (existingIndex !== -1) {
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
          total_item_price: (updatedItems[existingIndex].quantity + quantity) * action.payload.newPrice
        };
      } else {
        updatedItems.push({
          ...action.payload,
          quantity,
          total_item_price: quantity * action.payload.newPrice
        });
      }

      const newTotal = updatedItems.reduce((sum, item) => sum + item.total_item_price, 0);
      const newTaxes = newTotal * 0.18;
      const newGrandTotal = newTotal + newTaxes + state.deliveryCharges;

      return {
        ...state,
        cartItems: updatedItems,
        cartCounter: state.cartCounter + quantity,
        totalPrice: newTotal,
        taxes: newTaxes,
        grandTotal: newGrandTotal
      };
    }

    case 'REMOVE_FROM_CART': {
      const { _id, size } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        item => item._id === _id && item.size === size
      );

      if (itemIndex === -1) return state;

      const removedQuantity = state.cartItems[itemIndex].quantity;
      const updatedItems = state.cartItems.filter((_, index) => index !== itemIndex);
      const newTotal = updatedItems.reduce((sum, item) => sum + item.total_item_price, 0);
      const newTaxes = newTotal * 0.18;
      const newGrandTotal = newTotal + newTaxes + state.deliveryCharges;

      return {
        ...state,
        cartItems: updatedItems,
        cartCounter: state.cartCounter - removedQuantity,
        totalPrice: newTotal,
        taxes: newTaxes,
        grandTotal: newGrandTotal
      };
    }

    default:
      return state;
  }
};

export default cartReducer;