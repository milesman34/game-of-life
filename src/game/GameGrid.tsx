import { useState } from "react";
import Cell from "./Cell";

// Generates an empty grid with the given dimensions
const generateGrid = (width: number, height: number): Array<Array<boolean>> => new Array(height).fill(0).map(() => 
    new Array(width).fill(false)
);

// This component represents the game's grid
const GameGrid = ({ width, height }: {
    // Dimensions of the grid
    width: number;
    height: number;
}) => {
    // Track row/column offset of the grid
    const [rowOffset, setRowOffset] = useState(0);
    const [columnOffset, setColumnOffset] = useState(0);

    // Set up the boolean grid
    const [grid, setGrid] = useState(generateGrid(width, height));

    // Toggles the cell at the given row/column
    const toggleCell = (row: number, column: number) => {
        // I think React might not be a good fit, due to the need to re-render everything
        // The best way to fix that would be by using Redux and being able to get/set specific parts of the grid and only updating those?
        setGrid(grid.map(
            (gridRow, rowIndex) => rowIndex === row ? gridRow.map(
                (gridValue, columnIndex) => columnIndex === column ? !gridValue : gridValue
            ) : gridRow
        ));
    }
    
    // Set up the section to be displayed
    const gridSection = grid.slice(rowOffset, rowOffset + 25).map((row, rowIndex) => 
        <div className="game-row" key={rowIndex}>
            {row.slice(columnOffset, columnOffset + 25).map((active, columnIndex) => 
                <Cell 
                    key={columnIndex} 
                    row={rowOffset + rowIndex} 
                    column={columnOffset + columnIndex} 
                    toggle={() => toggleCell(rowOffset + rowIndex, columnOffset + columnIndex)} 
                    active={active} />
            )}
        </div>
    );

    return (
        <div className="game-grid">
            {gridSection}
        </div>
    )
}

export default GameGrid;