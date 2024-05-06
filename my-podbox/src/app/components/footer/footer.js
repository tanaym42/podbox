// components/Header.js
"use client";
import styles from "./page.module.css";
import Link from 'next/link';


const bottomFooter = () => {
    return (

      <div className={styles.footerMain}>

        <div className={styles.copyright}>
            <p> Copyright 2024 PodBox</p>
             
        </div>

        <div className={styles.about}>
          <Link href="/main-pages/about" className={styles.aboutLink}> About </Link>
          <Link href="/main-pages/faqs" className={styles.aboutLink}> FAQs </Link>
          <Link href="https://youtu.be/dQw4w9WgXcQ?si=k0Z1iLcj2QeF_caH" className={styles.aboutLink}> Contact </Link>
        </div>
      </div>

    );
  }
  
  export default bottomFooter;
  