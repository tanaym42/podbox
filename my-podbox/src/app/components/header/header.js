// components/Header.js
"use client";
import styles from "./page.module.css";
import Image from 'next/image';
import Link from 'next/link';
import PodBoxLogo from '../../../../public/PodBoxLogo2.svg'
import PodBoxText from "../../../../public/PodBoxText.svg"

const goHome = () => {
  window.location.replace("/");
}

const TopNav = () => {
    return (

      <div className={styles.header}>

        <div className={styles.headerlogo}>
          {/* image needs to be in the public folder for this to work */}
            <div>
              <Image src={PodBoxLogo} alt="PodBox Logo" height="50" priority onClick={goHome} />
            </div>
            <div>
              <Image src={PodBoxText} alt="PodBox Logo" height="50" priority onClick={goHome}/>
            </div>
            
            
        </div>

        <div className={styles.headermenu}>
            <Link href="/main-pages/dashboard" className={styles.navlink}>Dashboard</Link>
            <Link href="/main-pages/mydata" className={styles.navlink}>Files</Link>
            <Link href="/main-pages/myapps" className={styles.navlink}>My Apps</Link>
            <Link href="/main-pages/appstore" className={styles.navlink}>App Directory</Link>
            <Link href="/main-pages/faqs" className={styles.navlink}>FAQs</Link>
            <div className={styles.rightButtons}>
              <Link href="/main-pages/myprofile"><button className={styles.profileButton}> Account </button></Link>
              <Link href="/main-pages/home"><button className={styles.webIdButton}> Copy WebID </button></Link>
            </div>
        </div>
        {/* Add any other content specific to your header */}
      </div>

    );
  }
  
  export default TopNav;
  