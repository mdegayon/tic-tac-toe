import React from 'react';
import './WinnerPanel.css';
import ReloadButton from "../ReloadButton/ReloadButton";

function WinnerPanel({winner, onReloadClick}) {
  
  if (!winner) {
    return null;
  }

  const isTie = winner === 'Tie!';

  return (
      <section className="Winner nes-container">

        <section className="message-list">

          <section className="message -left">
            <i className="nes-bcrikko"></i>
            <div className="nes-balloon from-left">
              <p>
                {isTie ? (
                  <>
                    <i className="nes-icon is-large star"></i>
                    It's a tie! Nobody wins!
                  </>
                ) : (
                  <>
                    <i className="nes-icon trophy is-large"></i>
                    ¡{winner} won!
                  </>
                )}
              </p>
            </div>
          </section>

        </section>

        <ReloadButton onReloadClick={onReloadClick} />

      </section>
  );
}

export default WinnerPanel;
