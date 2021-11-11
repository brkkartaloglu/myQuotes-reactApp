import {
  GET_QUOTE,
  ADD_FAV,
  REMOVE_FAV,
  RESTORE,
} from "../constants/actionTypes";

const INITIAL_STATE = {
  author: "Burak KA",
  content: "All ends with beginnings, this is your starting point.",
  id: "01",
  tags: ["creator"],
};

const reducer = (state = { quote: INITIAL_STATE, favs: [] }, action) => {
  switch (action.type) {
    case GET_QUOTE:
      return {
        ...state,
        quote: action.payload,
      };
    case ADD_FAV:
      return { ...state, favs: [...state.favs, action.payload] };
    case RESTORE:
      localStorage.setItem("favorites", JSON.stringify({ ...state?.favs }));
      return state;

    case REMOVE_FAV:
      const favsArray = Object.values(
        JSON.parse(localStorage.getItem("favorites"))
      ).filter((quote) => quote.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(favsArray));

      return { ...state, favs: favsArray };
    default:
      return state;
  }
};
export default reducer;
