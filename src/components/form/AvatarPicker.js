import React from 'react';
import './AvatarPicker.css';

const AVATARS = [
    'nes-mario',
    'nes-ash',
    'nes-pokeball',
    'nes-bulbasaur',
    'nes-charmander',
    'nes-squirtle',
    'nes-kirby',
];

function AvatarPicker({ onSelect, onClose }) {
    return (
        <div className="avatar-picker nes-container is-rounded">
            <div className="avatar-grid">
                {AVATARS.map((avatar) => (
                    <i
                        key={avatar}
                        className={`${avatar} avatar-option`}
                        onClick={() => {
                            onSelect(avatar);
                            onClose();
                        }}
                    ></i>
                ))}
            </div>
        </div>
    );
}

export default AvatarPicker;
