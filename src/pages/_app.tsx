// Esse é o arquivo onde estarão todos os componentes que serão "estáticos" na aplicação
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
