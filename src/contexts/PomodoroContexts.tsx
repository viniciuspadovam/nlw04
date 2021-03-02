import { createContext, ReactNode, useEffect, useState } from 'react';

interface PomodoroProviderProps {
  children: ReactNode;
}

interface PomodoroContextProps {
  activeMinutes: number;
  activeSeconds: number;
  restMinutes: number;
  restSeconds: number;
  hasActivedFinished: boolean;
  hasRestFinished: boolean;
  isActiveTime: boolean;
  isActiveRest: boolean;
  startCountdownTimeActive: () => void;
  startCountdownTimeRest: () => void;
}

let countdownTimeout: NodeJS.Timeout;
let countdownTimeoutRest: NodeJS.Timeout;

export const PomodoroContext = createContext({} as PomodoroContextProps);

export function PomodoroProvider({ children }: PomodoroProviderProps) {
  const [activeTime, setAcitveTime] = useState(25 * 60);
  const [restTime, setRestTime] = useState(5 * 60);

  const [isActiveTime, setIsActiveTime] = useState(false);
  const [isActiveRest, setIsActiveRest] = useState(false);

  const [hasActivedFinished, setHasActivedFinished] = useState(false);
  const [hasRestFinished, setHasRestFinished] = useState(true);

  const activeMinutes = Math.floor(activeTime / 60);
  const activeSeconds = activeTime % 60;

  const restMinutes = Math.floor(restTime / 60);
  const restSeconds = restTime % 60;

  function startCountdownTimeActive() {
    setIsActiveTime(true);
  }

  function startCountdownTimeRest() {
    setIsActiveRest(true);
  }

  useEffect(() => {
    countdownTimeout = setTimeout(() => {
      if (isActiveTime && activeTime > 0) {
        setAcitveTime(activeTime - 1);
      } else if (isActiveTime && activeTime === 0) {
        setHasActivedFinished(true);
        setRestTime(5 * 60);
        setIsActiveTime(false);
      }
    }, 1000);
  }, [isActiveTime, activeTime]);

  useEffect(() => {
    countdownTimeoutRest = setTimeout(() => {
      if (isActiveRest && restTime > 0) {
        setRestTime(restTime - 1);
      } else if (isActiveRest && restTime === 0) {
        setHasRestFinished(true);
        setHasActivedFinished(false);
        setAcitveTime(25 * 60);
        setIsActiveRest(false);
      }
    }, 1000);
  }, [isActiveRest, restTime]);

  return (
    <PomodoroContext.Provider
      value={{
        activeMinutes,
        activeSeconds,
        restMinutes,
        restSeconds,
        hasActivedFinished,
        hasRestFinished,
        isActiveTime,
        isActiveRest,
        startCountdownTimeActive,
        startCountdownTimeRest,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}
//window.location.href
