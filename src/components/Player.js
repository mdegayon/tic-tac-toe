import React from 'react';
import EditableField from './form/EditableField';

function Player({ player, index, onNameChange }) {
    return (
        <div className="Player nes-container is-rounded">
            <i className={player.icon}></i>
            <ul>
                <li>
                    Name:{' '}
                    <EditableField
                        value={player.name}
                        onChange={(newName) => onNameChange(index, newName)}
                    />
                </li>
                <li>Victories: {player.victories}</li>
            </ul>
        </div>
    );
}

export default Player;
