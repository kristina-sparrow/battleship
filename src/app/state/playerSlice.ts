import { createSlice } from "@reduxjs/toolkit";

export interface PlayerState {
  currentPlayer: string;
}

const initialState: PlayerState = {
  currentPlayer: "hero",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changePlayer: (state) => {
      state.currentPlayer === "hero"
        ? (state.currentPlayer = "enemy")
        : (state.currentPlayer = "hero");
    },
  },
});

export const { changePlayer } = playerSlice.actions;
export default playerSlice.reducer;
