// components/Header.js
"use client";
import styles from "./page.module.css";
import Image from 'next/image';
import Link from 'next/link';
import PodBoxLogo from '../../../../public/PodBoxLogo2.svg'
import PodBoxText from "../../../../public/PodBoxText.svg"

const TopNav = () => {
    return (

      <div className={styles.header}>

        <div className={styles.headerlogo}>
          {/* image needs to be in the public folder for this to work */}
            <div>
              <Image src={PodBoxLogo} alt="PodBox Logo" height="50" priority />
            </div>
            <div>
              <Image src={PodBoxText} alt="PodBox Logo" height="50" priority />
            </div>
            
            
        </div>

        <div className={styles.headermenu}>
            <Link href="/main-pages/home"><h2 className={styles.navlink}>Dashboard</h2></Link>
            <Link href="/main-pages/mydata"><h2 className={styles.navlink}>My Data</h2></Link>
            <Link href="/main-pages/myapps"><h2 className={styles.navlink}>My Apps</h2></Link>
            <Link href="/main-pages/playstore"><h2 className={styles.navlink}>App Directory</h2></Link>
            <Link href="/main-pages/faqs"><h2 className={styles.navlink}>FAQs</h2></Link>
            <Link href="/main-pages/profile"><button className={styles.navbutton}> Profile </button></Link>
            <Link href="/main-pages/home"><button className={styles.navbutton}> Copy WebID </button></Link>
        </div>
        {/* Add any other content specific to your header */}
      </div>

    );
  }
  
  export default TopNav;
  