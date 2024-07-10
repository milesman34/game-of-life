import { useState } from "react";
import GameGrid from "./GameGrid";
import "./gameoflife.css";

// This component represents the mian game of life component
const GameOfLife = () => {
    // Rendering seems to perform really poorly with high sizes
    // Maybe I could set it up so that dragging is disabled and instead it just displays a set amount in a square space
    // So those are the only ones that get rendered, but the rest still exists
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);

    return (
        <div className="game-of-life-container">
            <GameGrid width={width} height={height} />

            <div className="game-controls">
                <div className="size-controller">
                    <div className="size-labels">
                        <div className="flex-center">Width</div>
                        <div className="flex-center">Height</div>
                    </div>

                    <div className="size-inputs">
                        <div className="flex-center-vert">
                            <input name="width" type="number" defaultValue={width}></input>
                        </div>
                        
                        <div className="flex-center-vert">
                            <input name="height" type="number" defaultValue={height}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameOfLife;