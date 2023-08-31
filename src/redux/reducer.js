import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./actions-type";

const initialState = {
  myFavorites: [],
  allCharacters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: [...state.allCharacters, action.payload],
        allCharacters: [...state.allCharacters, action.payload],
      };

    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: state.myFavorites.filter(
          (fav) => fav.id !== action.payload
        ),
        allCharacters: state.allCharacters.filter(
          (fav) => fav.id !== action.payload
        ),
      };

    case FILTER:
      const allCharactersFilter = state.allCharacters.filter(
        (character) => character.gender === action.payload
      );

      return {
        ...state,
        myFavorites: allCharactersFilter,
      };

    case ORDER:
      const allCharactersOrder = [...state.allCharacters];
      if (action.payload === "A") {
        allCharactersOrder.sort((a, b) => a.id - b.id);
      }
      if (action.payload === "D") {
        allCharactersOrder.sort((a, b) => b.id - a.id);
      }

      return {
        ...state,
        myFavorites: allCharactersOrder,
      };

    default:
      return { ...state };
  }
};

export default reducer;
