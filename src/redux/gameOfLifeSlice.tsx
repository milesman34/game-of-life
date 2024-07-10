import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store.tsx";
import range from "../range.tsx";

// Type for the game of life slice state
interface GameOfLifeState {
    grid: Array<Array<boolean>>
}

// Generates an empty grid
const generateGrid = (width: number, height: number): Array<Array<boolean>> =>
    range(0, height).map(() => range(0, width).map(() => false));

export const gameOfLifeSlice = createSlice({
    name: "life",
    initialState: {
        grid: generateGrid(200, 200)
    },
    reducers: {
        // Toggles the tile at the given row/column
        toggle(state: GameOfLifeState, action: PayloadAction<{
            row: number,
            column: number
        }>) {
            const { row, column } = action.payload;

            state.grid[row][column] = !state.grid[row][column]
        }
    }
});

// Set up the actions
export const { toggle } = gameOfLifeSlice.actions;

// Set up the selectors
export const selectValueAt = (row: number, column: number) => (state: RootState): boolean => state.life.grid[row][column];

export default gameOfLifeSlice.reducer;