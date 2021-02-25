// Esse é o arquivo onde estarão todos os componentes que serão "estáticos" na aplicação
import { ChallengesProvider } from '../contexts/ChallengesContexts';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp;
