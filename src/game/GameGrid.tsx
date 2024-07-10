import { useState } from "react";
import Cell from "./Cell";
import range from "../range";

// Generates an empty grid with the given dimensions
const generateGrid = (width: number, height: number): Array<Array<boolean>> => new Array(height).fill(0).map(() => 
    new Array(width).fill(false)
);

// This component represents the game's grid
const GameGrid = ({ width, height, viewWidth, viewHeight }: {
    // Dimensions of the grid
    width: number;
    height: number;

    // Dimensions of the viewable section
    viewWidth: number;
    viewHeight: number;
}) => {
    // Track row/column offset of the grid
    const [rowOffset, setRowOffset] = useState(0);
    const [columnOffset, setColumnOffset] = useState(0);

    // Set up the grid
    const grid = range(rowOffset, rowOffset + viewHeight).map(row => 
        <div className="game-row" key={row}>
            {range(columnOffset, columnOffset + viewWidth).map(column =>
                <Cell 
                    key={column}
                    row={row}
                    column={column} />
            )}
        </div>  
    );

    return (
        <div className="game-grid">
            {grid}
        </div>
    )
}

export default GameGrid;