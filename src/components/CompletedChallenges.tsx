import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContexts);
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>
        {
          // padStart é um método da String que fará uma verificação na string.
          // Neste caso, se ela tiver menos de 2 caracteres, este método ira completar
          // com um 0 os caracteres à esquerda
          String(challengesCompleted).padStart(2, '0')
        }
      </span>
    </div>
  );
}
