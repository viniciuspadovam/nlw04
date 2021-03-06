import { createContext, ReactNode, useEffect, useState } from 'react';
import { LevelUpModal } from '../components/LevelUpModal';
import Cookies from 'js-cookie';

// Retorna um Array com todos os dados do JSON.
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface contextDataType {
  level: number;
  currentXp: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  xpToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface challengesProviderProps {
  // ReactNpde é a tipagem usada quando o a tipagem do elemento passado também é um componente React.
  children: ReactNode;
  level: number;
  currentXp: number;
  challengesCompleted: number;
}

export const ChallengesContexts = createContext({} as contextDataType);

export function ChallengesProvider({
  children,
  ...rest
}: challengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentXp, setCurrentXp] = useState(rest.currentXp ?? 0);
  const [challengesCompleted, setChallengesCompletes] = useState(
    rest.challengesCompleted ?? 0
  );

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalActive, setIsLevelUpModalActive] = useState(false);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalActive(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalActive(false);
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentXp', String(currentXp));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentXp, challengesCompleted]);

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio disponível 💪', {
        body: `Está valendo ${challenge.amount}xp!!`,
      });
    }
  }

  // Ação do botão "falhei no desafio"
  function resetChallenge() {
    setActiveChallenge(null);
  }

  // Ação do botão de "completei o desafio"
  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentXp + amount;

    // Se finalExperience for maior que xpToNextLevel, subiremos de level e mandaremos o xp que sobrar para currentXp
    if (finalExperience >= xpToNextLevel) {
      finalExperience = finalExperience - xpToNextLevel;
      levelUp();
    }

    setCurrentXp(finalExperience);
    setActiveChallenge(null);
    setChallengesCompletes(challengesCompleted + 1);
  }

  return (
    <ChallengesContexts.Provider
      value={{
        level,
        currentXp,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        xpToNextLevel,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalActive && <LevelUpModal />}
    </ChallengesContexts.Provider>
  );
}
