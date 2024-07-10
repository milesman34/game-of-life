import { useDispatch, useSelector } from "react-redux";
import GameGrid from "./GameGrid";
import "./gameoflife.css";
import { resetGrid, selectColumn, selectHeight, selectRow, selectViewHeight, selectViewWidth, selectWidth, simulateStep, updateViewport } from "../redux/gameOfLifeSlice";
import { useState } from "react";

// This component represents the mian game of life component
const GameOfLife = () => {
    const dispatch = useDispatch();

    const width = useSelector(selectWidth);
    const height = useSelector(selectHeight);
    const viewWidth = useSelector(selectViewWidth);
    const viewHeight = useSelector(selectViewHeight);

    const row = useSelector(selectRow);
    const column = useSelector(selectColumn);

    // Form values
    const [formWidth, setFormWidth] = useState(width.toString());
    const [formHeight, setFormHeight] = useState(height.toString());
    const [formViewWidth, setFormViewWidth] = useState(viewWidth.toString());
    const [formViewHeight, setFormViewHeight] = useState(viewHeight.toString());

    // Did the form for size cause an update?
    // The idea behind these 2 variables is so that if the viewport size gets changed through one of the 2 methods, it will actually update the text
    const [formSizeUpdate, setFormSizeUpdate] = useState(false);

    // Did the form for viewport size cause an update?
    const [formViewSizeUpdate, setFormViewSizeUpdate] = useState(false);

    // Tries to parse a number string, returning the default value otherwise
    const tryParse = (string: string, defaultValue: number): number => {
        const parsed = parseInt(string);

        return Number.isNaN(parsed) ? defaultValue : parsed;
    }

    const onNewGridClicked = () => {
        dispatch(resetGrid({
            width: tryParse(formWidth, width),
            height: tryParse(formHeight, height)
        }));

        setFormSizeUpdate(true);
    }

    const onUpdateViewportClicked = () => {
        dispatch(updateViewport({
            width: tryParse(formViewWidth, viewWidth),
            height: tryParse(formViewHeight, viewHeight)
        }));

        setFormViewSizeUpdate(true);
    }

    if (formSizeUpdate) {
        setFormWidth(width.toString());
        setFormHeight(height.toString());
        setFormViewWidth(viewWidth.toString());
        setFormViewHeight(viewHeight.toString());
        setFormSizeUpdate(false);
    }

    if (formViewSizeUpdate) {
        setFormViewWidth(viewWidth.toString());
        setFormViewHeight(viewHeight.toString());
        setFormViewSizeUpdate(false);
    }

    return (
        <div className="game-of-life-container">
            <GameGrid />

            <div className="game-controls">
                <div className="current-position flex-center">({column}, {row})</div>

                <div className="size-controller">
                    <div className="size-labels">
                        <div className="flex-center">Width</div>
                        <div className="flex-center">Height</div>
                    </div>

                    <div className="size-inputs">
                        <div className="flex-center-vert">
                            <input name="width" type="number" value={formWidth} onChange={e => setFormWidth(e.target.value)}></input>
                        </div>
                        
                        <div className="flex-center-vert">
                            <input name="height" type="number" value={formHeight} onChange={e => setFormHeight(e.target.value)}></input>
                        </div>
                    </div>
                </div>

                <div className="reset-button-container">
                    <button className="reset-button" onClick={onNewGridClicked}>
                        New Grid
                    </button>
                </div>

                <div className="size-controller">
                    <div className="size-labels">
                        <div className="flex-center">View Width</div>
                        <div className="flex-center">View Height</div>
                    </div>

                    <div className="size-inputs">
                        <div className="flex-center-vert">
                            <input name="viewWidth" type="number" value={formViewWidth} onChange={e => setFormViewWidth(e.target.value)}></input>
                        </div>
                        
                        <div className="flex-center-vert">
                            <input name="viewHeight" type="number" value={formViewHeight} onChange={e => setFormViewHeight(e.target.value)}></input>
                        </div>
                    </div>
                </div>

                <div className="reset-button-container">
                    <button className="reset-button" onClick={onUpdateViewportClicked}>
                        Update
                    </button>
                </div>

                <div className="play-buttons">
                    <button className="step-button" onClick={() => dispatch(simulateStep())}>
                        Step
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameOfLife;