import React from 'react';

function WinnerPanel({winner}) {
  if (!winner) {
    return null;
  }

  return (
      <section className="Winner nes-container">

        <section className="message-list">

          <section className="message -left">
            <i className="nes-bcrikko"></i>
            <div className="nes-balloon from-left">
              <p>
                <i className="nes-icon trophy is-large"></i>
                ¡{winner} won!
              </p>
            </div>
          </section>

        </section>
      </section>
  );
}

export default WinnerPanel;
