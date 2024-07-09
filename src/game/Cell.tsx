import { useState } from "react";
import "./cell.css";
import classNames from "classnames";

// Represents a cell in the game of life
const Cell = () => {
    const [active, setActive] = useState(false);

    return (
        <div className={classNames("cell", active ? "cell-active" : "cell-inactive")} onClick={() => setActive(!active)}></div>
    )
}

export default Cell;