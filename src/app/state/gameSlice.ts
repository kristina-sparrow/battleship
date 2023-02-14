import { createSlice } from "@reduxjs/toolkit";

export interface GameState {
  isStarted: boolean;
  isOver: boolean;
}

const initialState: GameState = {
  isStarted: false,
  isOver: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.isStarted = true;
    },
    endGame: (state) => {
      state.isOver = true;
    },
  },
});

export const { startGame, endGame } = gameSlice.actions;
export default gameSlice.reducer;
