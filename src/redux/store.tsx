import { configureStore } from "@reduxjs/toolkit";
import gameOfLifeSlice from "./gameOfLifeSlice";

const store = configureStore({
    reducer: {
        life: gameOfLifeSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;