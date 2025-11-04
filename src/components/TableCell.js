import React from 'react';

function TableCell({ playerIcon, onClickChange }) {
  return (
    <td onClick={onClickChange}>
      {playerIcon && <i className={playerIcon}></i>}
    </td>
  );
}

export default TableCell;
