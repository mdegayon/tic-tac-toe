import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import BlinkService from '../services/BlinkService';
//import SoundEffectService from '../services/SoundEffectService';

function TableCell({ playerIcon, onClickChange, isWinningRow })
{

  const [iconClass, setIconClass] = useState(playerIcon || '');

  // Computa la "base" del icono sin is-empty (memoizado para no recalcular en cada tick)
  const baseIconClass = useMemo(() => {
    if (!playerIcon) return '';
    // elimina cualquier ocurrencia de 'is-empty' y arregla espacios
    return playerIcon.replace(/\bis-empty\b/g, '').replace(/\s+/g, ' ').trim();
  }, [playerIcon]);

  useEffect(() => {

    // Si no hay icono o no es una fila ganadora, asegura estado normal y salimos.
    if (!isWinningRow || !baseIconClass) {
      setIconClass(playerIcon || '');
      return;
    }

    // Suscribirse al servicio global para recibir true/false sincronizado.
    const unsubscribe = BlinkService.subscribe((blinkState) => {

      // Si blinkState === true mostramos la versión 'is-empty', si false la versión sin 'is-empty'
      const newClass = blinkState ? `${baseIconClass} is-empty` : baseIconClass;
      setIconClass(newClass);

    });

    // Al montar, forzamos un estado inicial coherente (opcional)
    // (si el servicio tiene su propio estado interno, las primeras emisiones sincronizarán todo)
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