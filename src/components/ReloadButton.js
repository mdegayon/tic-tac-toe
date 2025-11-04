import React from 'react';

function ReloadButton({onReloadClick}) {
  return (
    <button variant="primary" onClick={onReloadClick}>
      Reload
    </button>
  );
}

export default ReloadButton;
