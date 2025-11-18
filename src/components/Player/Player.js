import React, { useState } from 'react';
import EditableField from '../form/EditableField/EditableField';
import AvatarPicker from '../form/AvatarPicker/AvatarPicker';
import './Player.css';

function Player({ player, index, onNameChange, onAvatarChange, isCurrent, side }) {
    const [showPicker, setShowPicker] = useState(false);

    // Calculate percentages for the victory bar
    const totalGames = player.victories + player.losses + player.ties;
    const winPercentage = totalGames > 0 ? (player.victories / totalGames) * 100 : 0;
    const lossPercentage = totalGames > 0 ? (player.losses / totalGames) * 100 : 0;
    const tiePercentage = totalGames > 0 ? (player.ties / totalGames) * 100 : 0;

    return (
        <div
            className={`Player ${isCurrent ? 'is-current' : ''}`}
            style={{ position: 'relative' }}
        >
            <div className="player-avatar-container">

                <div
                    className={`player-avatar nes-container ${isCurrent ? 'avatar-blink' : ''}`}
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
                
                {/* Street Fighter 2 style victory bar */}
                <div className="victory-bar-container">
                    <div className="victory-bar">
                        <div 
                            className="victory-bar-segment wins" 
                            style={{ width: `${winPercentage}%` }}
                            title={`Wins: ${player.victories}`}
                        ></div>
                        <div 
                            className="victory-bar-segment losses" 
                            style={{ width: `${lossPercentage}%` }}
                            title={`Losses: ${player.losses}`}
                        ></div>
                        <div 
                            className="victory-bar-segment ties" 
                            style={{ width: `${tiePercentage}%` }}
                            title={`Ties: ${player.ties}`}
                        ></div>
                    </div>
                </div>
                
                <div className="player-score">
                    <span className="stat-wins">W: {player.victories}</span>
                    <span className="stat-losses">L: {player.losses}</span>
                    <span className="stat-ties">T: {player.ties}</span>
                </div>
            </div>
        </div>
    );
}

export default Player;
