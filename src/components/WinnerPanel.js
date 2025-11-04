import React from 'react';

function WinnerPanel({winner}) {
  if (!winner) {
    return null;
  }

  return (
    <div className="Winner">
      🏆 ¡{winner} won!
    </div>
  );
}

export default WinnerPanel;
