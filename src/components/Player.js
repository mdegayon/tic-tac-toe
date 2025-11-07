import React, { useState } from 'react';
import EditableField from './form/EditableField';
import AvatarPicker from './form/AvatarPicker';
import './Player.css';

function Player({ player, index, onNameChange, onAvatarChange }) {
    const [showPicker, setShowPicker] = useState(false);

    return (
        <div className="Player nes-container is-rounded" style={{ position: 'relative' }}>
            <div className="player-top">

                <div className="player-piece" title="Ficha">
                    <i className={player.icon}></i>
                </div>

                {/* Avatar seleccionable */}
                <div
                    className="player-avatar"
                    onClick={() => setShowPicker((s) => !s)}
                    title="Cambiar avatar"
                >
                    <i className={player.avatar || 'nes-mario'}></i>
                </div>
            </div>

            {/* Avatar picker (posicionado relativo al componente) */}
            {showPicker && (
                <AvatarPicker
                    onSelect={(avatar) => {
                        onAvatarChange(index, avatar);
                    }}
                    onClose={() => setShowPicker(false)}
                />
            )}

            <ul className="player-info">
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
