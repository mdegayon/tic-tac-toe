import React, { useState } from 'react';
import EditableField from '../form/EditableField/EditableField';
import AvatarPicker from '../form/AvatarPicker/AvatarPicker';
import './Player.css';

function Player({ player, index, onNameChange, onAvatarChange, isCurrent, side }) {
    const [showPicker, setShowPicker] = useState(false);

    return (
        <div
            className={`Player nes-container ${isCurrent ? 'is-current' : ''}`}
            style={{ position: 'relative' }}
        >
            <div className="player-avatar-container">

                <div
                    className="player-avatar"
                    onClick={() => setShowPicker((s) => !s)}
                    title="Change Avatar"
                >
                    <i className={player.avatar || 'nes-mario'}></i>
                </div>

                <div className="player-piece" title="Ficha">
                    <i className={player.icon}></i>
                </div>

                {showPicker && (
                    <AvatarPicker
                        side={side}
                        onSelect={(avatar) => {
                            onAvatarChange(index, avatar);
                            setShowPicker(false);
                        }}
                        onClose={() => setShowPicker(false)}
                    />
                )}

            </div>

            <div className="player-info-container">
                <EditableField
                    value={player.name}
                    onChange={(newName) => onNameChange(index, newName)}
                    className="player-name"
                />
                <div className="player-score">
                    <i className="nes-icon trophy is-small"></i> Victories: {player.victories}
                </div>
            </div>
        </div>
    );
}

export default Player;
