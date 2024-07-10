import { useEffect, useState } from "react";
import Cell from "./Cell";
import range from "../range";

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

    // Moves the row/column offset by the given amounts
    const moveOffsets = (row: number, column: number) => {
        setRowOffset(old => {
            const newValue = old + row;

            return (newValue >= 0 && newValue <= height - viewHeight) ? newValue : old;
        });

        setColumnOffset(old => {
            const newValue = old + column;

            return (newValue >= 0 && newValue <= width - viewWidth) ? newValue : old;
        });
    }

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowLeft":
                case "a":
                case "A":
                    moveOffsets(0, -1);
                    break;

                case "ArrowRight":
                case "d":
                case "D":
                    moveOffsets(0, 1);
                    break;

                case "ArrowUp":
                case "w":
                case "W":
                    moveOffsets(-1, 0);
                    break;

                case "ArrowDown":
                case "s":
                case "S":
                    moveOffsets(1, 0);
                    break;
            }
        }
        
        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener("keydown", listener);
        }
    }, []);

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