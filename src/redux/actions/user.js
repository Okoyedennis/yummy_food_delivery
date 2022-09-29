import { ADD_TO_CART, CLEAR_CURRENT_CART, CLEAR_CURRENT_USER, SET_CURRENT_USER } from "../types";

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};
export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER,
  };
};

export const addCurrentCount = (count) => {
  return {
    type: ADD_TO_CART,
    payload: count,
  }
}

export const clearCurrentCount = () => {
  return {
    type: CLEAR_CURRENT_CART,
  };
};
