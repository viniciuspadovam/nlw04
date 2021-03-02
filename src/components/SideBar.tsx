import Link from 'next/link';
import { useState } from 'react';

import styles from '../styles/components/SideBar.module.css';

export function SideBar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  function changeTheme() {
    isDarkTheme ? setIsDarkTheme(false) : setIsDarkTheme(true);
  }

  return (
    <div className={styles.sideBar}>
      <img src="/icons/logo.svg" alt="Logo" />
      <div className={styles.links}>
        <Link href="/">
          <a>
            <i className="fas fa-home"></i>
          </a>
        </Link>
        <Link href="/pomodoro">
          <a>
            <i className="far fa-hourglass"></i>
          </a>
        </Link>
      </div>
      <button onClick={changeTheme}>
        {isDarkTheme ? (
          <i className="fas fa-moon"></i>
        ) : (
          <i className="fas fa-sun"></i>
        )}
      </button>
    </div>
  );
}
