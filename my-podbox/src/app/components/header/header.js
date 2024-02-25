// components/Header.js
"use client";
import styles from "./page.module.css";

const TopNav = () => {
    return (

      <div className={styles.header}>

        <div className={styles.headerlogo}>
            <h1>PodBox.</h1>
        </div>

        <div className={styles.headermenu}>
            <h2 className={styles.navlink}>Random</h2>
            <h2>Random</h2>
            <h2>Random</h2>
            <button className={styles.navbutton}> Login </button>
            <button className={styles.navbutton}> Signup </button>
        </div>
        {/* Add any other content specific to your header */}
      </div>

    );
  }
  
  export default TopNav;
  