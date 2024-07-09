import "./common.css";
import GameOfLife from "./game/GameOfLife";
import "./index.css";

const App = () => {
    return (
        <div className="app">
            <div className="flex-center app-header">
                Game of Life
            </div>

            <GameOfLife />
        </div>
    );
}

export default App;
