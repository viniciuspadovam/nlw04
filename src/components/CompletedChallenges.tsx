import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContexts);
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{String(challengesCompleted).padStart(2, '0')}</span>
    </div>
  );
}