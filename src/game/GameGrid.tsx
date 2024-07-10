import { useEffect } from "react";
import Cell from "./Cell";
import range from "../range";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, addRow, selectColumn, selectRow, selectViewHeight, selectViewWidth } from "../redux/gameOfLifeSlice";

// This component represents the game's grid
const GameGrid = () => {
    const dispatch = useDispatch();

    const rowOffset = useSelector(selectRow);
    const columnOffset = useSelector(selectColumn);

    const viewWidth = useSelector(selectViewWidth);
    const viewHeight = useSelector(selectViewHeight);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowLeft":
                case "a":
                case "A":
                    dispatch(addColumn(-1));
                    break;

                case "ArrowRight":
                case "d":
                case "D":
                    dispatch(addColumn(1));
                    break;

                case "ArrowUp":
                case "w":
                case "W":
                    dispatch(addRow(-1));
                    break;

                case "ArrowDown":
                case "s":
                case "S":
                    dispatch(addRow(1));
                    break;
            }
        }
        
        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener("keydown", listener);
        }
    }, [dispatch]);

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