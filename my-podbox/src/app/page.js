"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';


export default function Home() {

  return (
    <main className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.leftpain}>
          <h2>Welcome to PodBox!</h2>
          <h2>Take back control of your data.</h2>
          <h1> Main Value Proposition </h1>
          <p>Try to login to get started. Use one of the login buttons below. This is just a bunch of filler text for no reason at all but to be here. It has no purpose. It just is.</p>
          
          <Link href="/components/login">
            <button className={styles.button}>Login</button>
          </Link>
        </div>
       
        <div className={styles.rightpain}>
          <p>Random graphic here</p>
        </div>

      </div>
    </main>
  );
}
