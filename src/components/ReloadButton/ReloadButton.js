import React from 'react';
import SoundEffectService from "../../services/SoundEffectService";

function ReloadButton({onReloadClick}) {

    const handleClick = (e) => {
        SoundEffectService.trigger('game:reload');
        onReloadClick(e);
    };

    return (
        <button className="nes-btn" onClick={handleClick} type="button">
            Reload
        </button>
    );
}

export default ReloadButton;
