import GameGrid from "./GameGrid";
import "./gameoflife.css";

// This component represents the mian game of life component
const GameOfLife = () => {
    return (
        <div className="game-of-life-container">
            <GameGrid />

            <div className="game-controls">
                <div className="size-controller">
                    <div className="size-labels">
                        <div className="flex-center">Width</div>
                        <div className="flex-center">Height</div>
                    </div>

                    <div className="size-inputs">
                        <div className="flex-center-vert">
                            <input name="width" type="number" defaultValue={200}></input>
                        </div>
                        
                        <div className="flex-center-vert">
                            <input name="height" type="number" defaultValue={200}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameOfLife;