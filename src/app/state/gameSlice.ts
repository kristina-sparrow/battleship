import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface GameState {
  isOver: boolean;
}

const initialState: GameState = {
  isOver: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    endGame: (state) => {
      state.isOver = true;
    },
  },
});

export const { endGame } = gameSlice.actions;
export default gameSlice.reducer;
