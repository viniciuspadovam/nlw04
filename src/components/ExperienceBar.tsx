import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentXp, xpToNextLevel } = useContext(ChallengesContexts);
  const percenttoNextLevel = Math.round(currentXp * 100) / xpToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0xp</span>
      <div>
        <div style={{ width: `${percenttoNextLevel}%` }}></div>
        <span
          className={styles.currentXp}
          style={{ left: `${percenttoNextLevel}%` }}
        >
          {currentXp}xp
        </span>
      </div>
      <span>{xpToNextLevel}xp</span>
    </header>
  );
}
