import range from "../range";
import Cell from "./Cell";
import "./gameoflife.css";

import React, { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

// This component represents the mian game of life component
const GameOfLife = () => {
    // Reference to the wrapping div for useDraggable
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

    // Pass the reference to the useDraggable hook
    const { events } = useDraggable(ref);

    // Current size will be 100x100
    const width = 100;
    const height = 100;

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
        <div className="game-of-life-container" {...events} ref={ref}>
            {grid}
        </div>
    )
}

export default GameOfLife;