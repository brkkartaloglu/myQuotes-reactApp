import * as api from "../api";
import {
  GET_QUOTE,
  ADD_FAV,
  REMOVE_FAV,
  RESTORE,
} from "../constants/actionTypes";

export const getQuote = () => async (dispatch) => {
  try {
    const quote = await api.getQuote();
    dispatch({ type: GET_QUOTE, payload: quote });
  } catch (error) {
    console.log(error.message);
  }
};

export const addFav = (quote) => async (dispatch) => {
  try {
    dispatch({ type: ADD_FAV, payload: quote });
    dispatch({ type: RESTORE });
  } catch (error) {
    console.log(error.message);
  }
};

export const removeFav = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FAV, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const getQuotebySearch = (tag, id) => async (dispatch) => {
  try {
    const quote = await api.getQuotebySearch(tag, id);

    dispatch({ type: GET_QUOTE, payload: quote });
  } catch (error) {
    console.log(error.message);
  }
};
