import React from 'react';

function TurnPanel({turnIcon}) {
  return (
    <div>
      <i className={turnIcon}></i>
      <br/>
      turn
    </div>
  );
}

export default TurnPanel;
