import React from "react";
import styles from "./AppLayout.module.scss";

export const AppLayout: React.FC = () => {
  return (
    <div className={styles.appLayout}>
      <div className={styles.appBase}>
        <header>App-Header</header>
        <main>App-Main</main>
        <footer>App-Footer</footer>
      </div>
    </div>
  );
};
