import React from 'react';

function Player({player}) {
  return (
    <div className="Player">
      <i className={player.icon}></i>
      <ul>
        <li>Name: {player.name}</li>
        <li>Victories: {player.victories}</li>
      </ul>
    </div>
  );
}

export default Player;
