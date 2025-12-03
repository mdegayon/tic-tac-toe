import {React} from "react";

function GameModeSelector() {
    return (
        <div>
            <label htmlFor="default_select">Default select</label>
            <div className="nes-select">
                <select required="" id="default_select" className="is-success">
                    <option value="" disabled="" selected="" hidden="">Select Game Mode...</option>
                    <option value="0">Player VS Player</option>
                    <option value="1">Player VS CPU</option>
                </select>
            </div>
        </div>
    );
}

export default GameModeSelector;