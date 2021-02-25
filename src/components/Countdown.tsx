import { useContext, useEffect, useState } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContexts);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // padStart é um método da String que fará uma verificação na string.
  // Neste caso, se ela tiver menos de 2 caracteres, este método ira completar com um 0 os caracteres à esquerda
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60);
  }

  // ------------------------------------------------------------------------------------------------------------
  /*
   * Responsável por fazer o timer iniciar.
   *
   * Sempre que o 'active' ou o 'time' mudarem, o callback do useEffect será acionado,
   * portanto acionando o setTimeout, que irá subtrair 1 de 'time' através do setTime e,
   * mudando o 'time', todo o cilco se reinicia até ele chegar a 0 ou o 'active' ter seu
   * valor alterado para false.
   *
   */
  useEffect(() => {
    countdownTimeout = setTimeout(() => {
      if (isActive && time > 0) {
        setTime(time - 1);
      } else if (isActive && time === 0) {
        setHasFinished(true);
        setIsActive(false);
        startNewChallenge();
      }
    }, 1000);
  }, [isActive, time]);
  // ------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
          <img src="icons/correct.png" alt="Cicle complete" />
          <div></div>
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
              <div></div>
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo <span>&#x025B8;</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

// &raquo;
