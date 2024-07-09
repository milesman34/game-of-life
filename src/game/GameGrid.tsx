import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import range from "../range";
import Cell from "./Cell";

// This component represents the game's grid
const GameGrid = ({ width, height}: {
    width: number;
    height: number;
}) => {
    // Reference to the wrapping div for useDraggable
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

    // Pass the reference to the useDraggable hook
    const { events } = useDraggable(ref);

        // Set up the grid
    // const grid = [new Array(height).fill(0).map(() => new Array(width).fill(0).map((_, index) => <Cell key={index} />))];
    const grid = range(0, height).map(row => 
        <div key={row} className="game-row">
            {range(0, width).map(column => 
                <Cell key={column} />
            )}
        </div>
    )

    return (
        <div className="game-grid" {...events} ref={ref}>
            {grid}
        </div>
    )
}

export default GameGrid;