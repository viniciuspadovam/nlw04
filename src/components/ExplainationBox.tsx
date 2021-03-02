import styles from '../styles/components/ExplainationBox.module.css';

export function ExplainationBox() {
  return (
    <div className={styles.explainationBoxContainer}>
      <div className={styles.explaination}>
        <strong>O que é a técnica de Pomodoro?</strong>
        <p>
          A Técnica Pomodoro é um método de gerenciamento de tempo desenvolvido
          por Francesco Cirillo no final dos anos 1980. A técnica consiste na
          utilização de um cronômetro para dividir o trabalho em períodos de 25
          minutos, separados por breves intervalos. A técnica deriva seu nome da
          palavra italiana pomodoro (tomate), como referência ao popular
          cronômetro gastronômico na forma dessa fruta. O método é baseado na
          ideia de que pausas frequentes podem aumentar a agilidade mental.
          <br />
          <a href="https://pt.wikipedia.org/wiki/T%C3%A9cnica_pomodoro">
            Informações reitradas da wikipedia.
          </a>
        </p>
      </div>
    </div>
  );
}
