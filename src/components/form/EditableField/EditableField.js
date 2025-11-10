import React, { useState, useEffect } from 'react';

function EditableField({ value, onChange, className }) {
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    // Si el valor externo cambia (por ejemplo, por reseteo), sincroniza
    useEffect(() => {
        setTempValue(value);
    }, [value]);

    const confirmChange = () => {
        setEditing(false);
        const newValue = tempValue.trim();
        if (newValue && newValue !== value) {
            onChange(newValue);
        } else {
            setTempValue(value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') confirmChange();
        if (e.key === 'Escape') {
            setTempValue(value);
            setEditing(false);
        }
    };

    return (
        <span className={className}>
      {editing ? (
          <input
              className="nes-input"
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={confirmChange}
              onKeyDown={handleKeyDown}
              autoFocus
          />
      ) : (
          <span
              onClick={() => setEditing(true)}
              style={{ cursor: 'pointer' }}
          >
          {value}
        </span>
      )}
    </span>
    );
}

export default EditableField;
