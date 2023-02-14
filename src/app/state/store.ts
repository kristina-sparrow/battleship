import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import modalReducer from "./modalSlice";
import playerReducer from "./playerSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    modal: modalReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
