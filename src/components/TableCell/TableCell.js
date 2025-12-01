import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import BlinkService from '../../services/BlinkService';
//import SoundEffectService from '../services/SoundEffectService';

function TableCell({ playerIcon, onClickChange, isWinningRow })
{

  const [iconClass, setIconClass] = useState(playerIcon || '');

  // Computes the icon "base" without is-empty (memoized to avoid recalculating on every tick)
  const baseIconClass = useMemo(() => {
    if (!playerIcon) return '';
    // removes any occurrence of 'is-empty' and fixes spacing
    return playerIcon.replace(/\bis-empty\b/g, '').replace(/\s+/g, ' ').trim();
  }, [playerIcon]);

  useEffect(() => {

    // If there is no icon or it isn’t a winning row, ensure the normal state and exit.
    if (!isWinningRow || !baseIconClass) {
      setIconClass(playerIcon || '');
      return;
    }

    // Subscribe to the global service to receive synchronized true/false.
    const unsubscribe = BlinkService.subscribe((blinkState) => {

      // If blinkState === true we show the 'is-empty' version; if false, the version without 'is-empty'
      const newClass = blinkState ? `${baseIconClass} is-empty` : baseIconClass;
      setIconClass(newClass);

    });

    // On mount, we force a consistent initial state (optional)
    // (if the service has its own internal state, the first emissions will synchronize everything)
    // cleanup:
    return () => unsubscribe();

  }, [isWinningRow, baseIconClass, playerIcon]);

  return (
      <td onClick={onClickChange} className={isWinningRow ? 'winning-row' : ''}>
        {iconClass ? <i className={iconClass} aria-hidden="true"></i> : null}
      </td>
  );
}

export default TableCell;