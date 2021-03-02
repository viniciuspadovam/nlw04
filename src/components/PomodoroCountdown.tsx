import { useContext } from 'react';
import { PomodoroContext } from '../contexts/PomodoroContexts';

import styles from '../styles/components/PomodoroCountdown.module.css';

export function PomodoroCountdown() {
  const {
    activeMinutes,
    activeSeconds,
    restMinutes,
    restSeconds,
    hasActivedFinished,
    hasRestFinished,
    isActiveRest,
    isActiveTime,
    startCountdownTimeActive,
    startCountdownTimeRest,
  } = useContext(PomodoroContext);

  const [activeMinuteLeft, activeMinuteRight] = String(activeMinutes)
    .padStart(2, '0')
    .split('');
  const [activeSecondLeft, activeSecondRight] = String(activeSeconds)
    .padStart(2, '0')
    .split('');

  const [restMinuteLeft, restMinuteRight] = String(restMinutes)
    .padStart(2, '0')
    .split('');
  const [restSecondLeft, restSecondRight] = String(restSeconds)
    .padStart(2, '0')
    .split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>
            {!hasActivedFinished && hasRestFinished
              ? activeMinuteLeft
              : restMinuteLeft}
          </span>
          <span>
            {!hasActivedFinished && hasRestFinished
              ? activeMinuteRight
              : restMinuteRight}
          </span>
        </div>
        <span>:</span>
        <div>
          <span>
            {!hasActivedFinished && hasRestFinished
              ? activeSecondLeft
              : restSecondLeft}
          </span>
          <span>
            {!hasActivedFinished && hasRestFinished
              ? activeSecondRight
              : restSecondRight}
          </span>
        </div>
      </div>
      {isActiveTime || isActiveRest ? (
        <button disabled className={styles.countdownButton}>
          Porfavor, não interrompa seu ciclo Pomodoro
        </button>
      ) : (
        <>
          {!hasActivedFinished && hasRestFinished ? (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdownTimeActive}
            >
              Iniciar o cronômetro <span>&#x025B8;</span>
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={startCountdownTimeRest}
            >
              Inicie o descanço
            </button>
          )}
        </>
      )}
    </div>
  );
}
