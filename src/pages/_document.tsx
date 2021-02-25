// Arquivo que contém as coisas 100% estáticas da aplicação; Que só serão carregados na
// primeira vez que o usuário acessar a página
import Document, { Html, Head, Main, NextScript } from 'next/document';
// O Main é onde será carregado o index.tsx

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="favicon.png" type="image/png" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
