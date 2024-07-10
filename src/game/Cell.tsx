import { useState } from "react";
import "./cell.css";
import classNames from "classnames";

// Represents a cell in the game of life
const Cell = ({ row, column, active, toggle }: {
    row: number;
    column: number;
    active: boolean;
    
    // Toggle function toggles this cell
    toggle: () => void;
}) => {
    return (
        <div className={classNames("cell", active ? "cell-active" : "cell-inactive")} onClick={toggle}></div>
    )
}

export default Cell;