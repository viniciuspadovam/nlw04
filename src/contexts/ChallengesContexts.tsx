import { createContext, ReactNode, useState } from 'react';
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
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  xpToNextLevel: number;
}

interface challengesProviderProps {
  // ReactNpde é a tipagem usada quando o a tipagem do elemento passado também é um componente React.
  children: ReactNode;
}

export const ChallengesContexts = createContext({} as contextDataType);

export function ChallengesProvider({ children }: challengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentXp, setCurrentXp] = useState(0);
  const [challengesCompleted, setChallengesCompletes] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const xpToNextLevel = Math.pow((level + 1) * 5, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
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
      }}
    >
      {children}
    </ChallengesContexts.Provider>
  );
}
