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

    // Maps active positions to true
    activeCells: {
        [key: string]: boolean;
    }
}

// Calculates the top-left coordinate for the center
const baseCoordinate = (maxSize: number, viewSize: number): number => Math.round(maxSize / 2) - Math.round(viewSize / 2);

// Generates an empty grid
const generateGrid = (width: number, height: number): Array<Array<boolean>> =>
    range(0, height).map(() => range(0, width).map(() => false));

// All possible offsets
const offsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export const gameOfLifeSlice = createSlice({
    name: "life",
    initialState: {
        grid: generateGrid(200, 200),

        width: 200,
        height: 200,

        viewWidth: 40,
        viewHeight: 20,

        row: baseCoordinate(200, 20),
        column: baseCoordinate(200, 40),

        activeCells: {}
    },
    reducers: {
        // Toggles the tile at the given row/column
        toggle(state: GameOfLifeState, action: PayloadAction<{
            row: number;
            column: number;
        }>) {
            const { row, column } = action.payload;

            state.grid[row][column] = !state.grid[row][column]

            if (state.grid[row][column]) {
                // There doesn't seem to be a good solution to this in typescript
                state.activeCells[JSON.stringify([row, column])] = false;
            } else {
                delete state.activeCells[JSON.stringify([row, column])];
            }
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

        // Updates the view width/height
        updateViewport(state: GameOfLifeState, action: PayloadAction<{
            width: number;
            height: number;
        }>) {
            const { width, height } = action.payload;

            // The viewport size must be no larger than the grid size
            state.viewWidth = Math.min(state.width, width);
            state.viewHeight = Math.min(state.height, height);

            state.row = baseCoordinate(state.height, state.viewHeight);
            state.column = baseCoordinate(state.width, state.viewWidth);
        },

        // Resets the grid with a new width/height
        resetGrid(state: GameOfLifeState, action: PayloadAction<{
            width: number;
            height: number;
        }>) {
            const { width, height } = action.payload;

            state.width = width;
            state.height = height;

            // The viewport size must be no larger than the grid size
            state.viewWidth = Math.min(state.viewWidth, state.width);
            state.viewHeight = Math.min(state.viewHeight, state.height);

            state.row = baseCoordinate(state.height, state.viewHeight);
            state.column = baseCoordinate(state.width, state.viewWidth);

            // Create the new grid
            state.grid = generateGrid(width, height);

            state.activeCells = {};
        },

        // Simulates 1 step of the game of life
        simulateStep(state: GameOfLifeState) {
            // Figure out what positions to check
            const checkPositions: {
                [key: string]: boolean
            } = {};

            for (const position in state.activeCells) {
                const [row, column] = JSON.parse(position);

                // I can't use the normal offsets bc it doesn't include the original cell
                for (let offRow = -1; offRow <= 1; offRow++) {
                    for (let offCol = -1; offCol <= 1; offCol++) {
                        const newRow = row + offRow;
                        const newCol = column + offCol;

                        if (newRow >= 0 && newRow < state.height && newCol >= 0 && newCol <= state.width) {
                            checkPositions[JSON.stringify([newRow, newCol])] = true;
                        }
                    }
                }
            }

            // Use a 2D object as a hashmap
            const newGrid = generateGrid(state.width, state.height);
            state.activeCells = {};

            for (const position in checkPositions) {
                const [row, column] = JSON.parse(position);

                let count = 0;

                // Count neighbors
                for (const offset of offsets) {
                    const newRow = row + offset[0];
                    const newCol = column + offset[1];
                    
                    if (newRow >= 0 && newRow < state.height && newCol >= 0 && newCol <= state.width && state.grid[newRow][newCol]) {
                        count++;
                    } 
                }

                if (count === 3 || (state.grid[row][column] && count === 2)) {
                    newGrid[row][column] = true;
                    
                    state.activeCells[JSON.stringify([row, column])] = true;
                }
            }

            state.grid = newGrid;
        }
    }
});

// Set up the actions
export const { toggle, addRow, addColumn, updateViewport, resetGrid, simulateStep } = gameOfLifeSlice.actions;

// Set up the selectors
export const selectValueAt = (row: number, column: number) => (state: RootState): boolean => state.life.grid[row][column];
export const selectWidth = (state: RootState): number => state.life.width;
export const selectHeight = (state: RootState): number => state.life.height;
export const selectViewWidth = (state: RootState): number => state.life.viewWidth;
export const selectViewHeight = (state: RootState): number => state.life.viewHeight;
export const selectRow = (state: RootState): number => state.life.row;
export const selectColumn = (state: RootState): number => state.life.column;

export default gameOfLifeSlice.reducer;