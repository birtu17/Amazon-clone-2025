import { Type } from "./action.type";

export const initialState = { basket: [], user: null };

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // Check if the item already exists in the basket
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        // If the item does not exist, add it to the basket with amount 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        // If the item exists, update the amount
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 } // Update the amount
            : item
        );
        return { ...state, basket: updatedBasket };
      }

    case Type.REMOVE_FROM_BASKET:
      // Find the item to remove
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          // If the amount is greater than 1, decrease the amount
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // If the amount is 1, remove the item from the basket
          newBasket.splice(index, 1);
        }
        return { ...state, basket: newBasket };
      }
    case Type.EMPTY_BASKET:
      return { ...state, basket: [] };
    case Type.SET_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};
