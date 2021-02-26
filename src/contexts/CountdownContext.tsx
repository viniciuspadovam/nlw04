import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

/*
 * O CountdownProvider foi colocar no index.tsx ao envés de ser colocado no
 * _app.tsx pois é um contexto que só será usado na página Home da aplicação
 * e não nela inteira como é o caso do ChallengesContext.
 */

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContexts);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
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
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
