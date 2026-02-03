import { SimplePokemon } from "@/src/pokemons";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PokemonsState {
  favorites: { [key: string]: SimplePokemon };
}

/* const getInitialState = () => {
  const favorites = JSON.parse(
    localStorage.getItem("favoritePokemons") ?? "{}",
  );
  return favorites;
}; */

const initialState: PokemonsState = {
  favorites: {},
  /*   "1": {
    id: "1",
    name: "Bulbasaur",
  },
  "2": {
    id: "2",
    name: "Ivysaur",
  },
  "3": {
    id: "3",
    name: "Venusaur",
  }, */
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setFavorites: (
      state,
      action: PayloadAction<{ [key: string]: SimplePokemon }>,
    ) => {
      state.favorites = action.payload;
    },

    toggleFavorite: (state, action: PayloadAction<SimplePokemon>) => {
      const { id } = action.payload;
      if (state.favorites[id]) {
        delete state.favorites[id];
      } else {
        state.favorites[id] = action.payload;
      }

      localStorage.setItem("favoritePokemons", JSON.stringify(state.favorites));
    },
  },
});

export const { toggleFavorite, setFavorites } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
