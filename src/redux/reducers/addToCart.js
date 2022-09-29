import { ADD_TO_CART, CLEAR_CURRENT_CART } from "../types";

const addToCartReducer = (state = 0, action) => {
  switch (action?.type) {
    case ADD_TO_CART:
      localStorage.setItem("addCount", JSON.stringify(state + 1));
      return state + 1;
    case CLEAR_CURRENT_CART:
      localStorage.setItem("addCount", JSON.stringify((state = 0)));
      return (state = 0);
    default:
      return JSON.parse(localStorage.getItem("addCount"));
  }
};

export default addToCartReducer;
