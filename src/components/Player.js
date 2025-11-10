import React, { useState, useEffect } from 'react';
import EditableField from './form/EditableField';
import AvatarPicker from './form/AvatarPicker';
import './Player.css';

function Player({ player, index, onNameChange, onAvatarChange, isCurrent }) {
    const [showPicker, setShowPicker] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        let interval;
        if (isCurrent) {
            interval = setInterval(() => {
                setIsDark((prev) => !prev);
            }, 700); // velocidad del parpadeo
        } else {
            setIsDark(false);
        }

        return () => clearInterval(interval);
    }, [isCurrent]);

    return (
        <div
            className={`Player nes-container is-rounded ${
                isCurrent && isDark ? 'is-dark' : ''
            }`}
            style={{ position: 'relative' }}
        >
            <div className="player-top">
                <div className="player-piece" title="Ficha">
                    <i className={player.icon}></i>
                </div>

                <div
                    className="player-avatar"
                    onClick={() => setShowPicker((s) => !s)}
                    title="Cambiar avatar"
                >
                    <i className={player.avatar || 'nes-mario'}></i>
                </div>
            </div>

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
