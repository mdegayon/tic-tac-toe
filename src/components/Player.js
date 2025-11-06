import React from 'react';

function Player({player}) {
  return (
    <div className="Player nes-container is-rounded">
        <i className={player.icon}></i>
        <ul>
            <li>Name: {player.name}</li>
        <li>Victories: {player.victories}</li>
      </ul>
    </div>
  );
}

export default Player;
