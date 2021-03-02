import { Profile } from '../components/Profile';
import { ChallengesProvider } from '../contexts/ChallengesContexts';
import { GetServerSideProps } from 'next';
import { PomodoroProvider } from '../contexts/PomodoroContexts';
import { PomodoroCountdown } from '../components/PomodoroCountdown';
import Head from 'next/head';

import styles from '../styles/pages/PomodoroPage.module.css';
import { ExplainationBox } from '../components/ExplainationBox';

interface HomeProps {
  level: number;
  currentXp: number;
  challengesCompleted: number;
}

export default function PomodoroPage(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentXp={props.currentXp}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title> Pomodoro | move.it </title>
        </Head>
        <section>
          <div>
            <Profile />

            <PomodoroProvider>
              <PomodoroCountdown />
            </PomodoroProvider>
          </div>
          <div>
            <ExplainationBox />
          </div>
        </section>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { level, currentXp, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentXp: Number(currentXp),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
