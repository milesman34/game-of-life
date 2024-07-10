import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store.tsx";
import range from "../range.tsx";

// Type for the game of life slice state
interface GameOfLifeState {
    grid: Array<Array<boolean>>;

    // Dimensions of grid
    width: number;
    height: number;

    // Dimensions of the square to be rendered
    viewWidth: number;
    viewHeight: number;

    // Current offset position (top left) of grid
    row: number;
    column: number;
}

// Calculates the top-left coordinate for the center
const baseCoordinate = (maxSize: number, viewSize: number): number => Math.round(maxSize / 2) - Math.round(viewSize / 2);

// Generates an empty grid
const generateGrid = (width: number, height: number): Array<Array<boolean>> =>
    range(0, height).map(() => range(0, width).map(() => false));

export const gameOfLifeSlice = createSlice({
    name: "life",
    initialState: {
        grid: generateGrid(200, 200),

        width: 200,
        height: 200,

        viewWidth: 40,
        viewHeight: 20,

        row: baseCoordinate(200, 40),
        column: baseCoordinate(200, 20)
    },
    reducers: {
        // Toggles the tile at the given row/column
        toggle(state: GameOfLifeState, action: PayloadAction<{
            row: number,
            column: number
        }>) {
            const { row, column } = action.payload;

            state.grid[row][column] = !state.grid[row][column]
        },

        // Adds to the row if possible
        addRow(state: GameOfLifeState, action: PayloadAction<number>) {
            const newRow = state.row + action.payload;

            if (newRow >= 0 && newRow <= state.height - state.viewHeight) {
                state.row = newRow;
            }
        },

        // Adds to the column if possible
        addColumn(state: GameOfLifeState, action: PayloadAction<number>) {
            const newColumn = state.column + action.payload;

            if (newColumn >= 0 && newColumn <= state.width - state.viewWidth) {
                state.column = newColumn;
            }
        },
    }
});

// Set up the actions
export const { toggle, addRow, addColumn } = gameOfLifeSlice.actions;

// Set up the selectors
export const selectValueAt = (row: number, column: number) => (state: RootState): boolean => state.life.grid[row][column];
export const selectWidth = (state: RootState): number => state.life.width;
export const selectHeight = (state: RootState): number => state.life.height;
export const selectViewWidth = (state: RootState): number => state.life.viewWidth;
export const selectViewHeight = (state: RootState): number => state.life.viewHeight;
export const selectRow = (state: RootState): number => state.life.row;
export const selectColumn = (state: RootState): number => state.life.column;

export default gameOfLifeSlice.reducer;