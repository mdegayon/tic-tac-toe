import React from 'react';

function ReloadButton({onReloadClick}) {
  return (
    <a className="nes-btn" href="#" onClick={onReloadClick}>
        Reload
    </a>
  );
}

export default ReloadButton;
