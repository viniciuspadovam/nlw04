// Esse é o arquivo onde estarão todos os componentes que serão "estáticos" na aplicação
import { SideBar } from '../components/SideBar';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SideBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
