import "./cell.css";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { selectCellSize, selectValueAt, toggle } from "../redux/gameOfLifeSlice";

// Represents a cell in the game of life
const Cell = ({ row, column }: {
    row: number;
    column: number;
}) => {
    const dispatch = useDispatch();
    const active = useSelector(selectValueAt(row, column));
    const cellSize = useSelector(selectCellSize);

    return (
        <div className={classNames("cell", active ? "cell-active" : "cell-inactive")} style={{
            width: cellSize,
            height: cellSize,
            minWidth: cellSize
        }} onClick={() => dispatch(toggle({
            row,
            column
        }))}></div>
    )
}

export default Cell;