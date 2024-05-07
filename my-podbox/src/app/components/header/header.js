// components/Header.js
"use client";
import styles from "./page.module.css";
import Image from 'next/image';
import Link from 'next/link';
import PodBoxLogo from '../../../../public/PodBoxLogo2.svg'
import PodBoxText from "../../../../public/PodBoxText.svg"

import { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();



const goHome = () => {
  window.location.replace("/");
}

const TopNav = () => {
    // State to keep track of the active page
    const [activePage, setActivePage] = useState('');

    // Function to handle clicking on a link and updating the active page
    const handlePageClick = (page) => {
      setActivePage(page);
    };

    // Set a default active page when the component mounts
    useEffect(() => {
      // Set the default active page to 'dashboard'
      setActivePage('dashboard');
    }, []);

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
              <Link href="/main-pages/dashboard"
                    className={`${styles.navlink} ${activePage === 'dashboard' ? styles.active : ''}`} 
                    onClick={() => handlePageClick('dashboard')}>
                      Dashboard
              </Link>
              <Link href="/main-pages/mydata"
                   className={`${styles.navlink} ${activePage === 'mydata' ? styles.active : ''}`} 
                   onClick={() => handlePageClick('mydata')}>
                      Files
              </Link>
              <Link href="/main-pages/myapps" className={`${styles.navlink} ${activePage === 'myapps' ? styles.active : ''}`} onClick={() => handlePageClick('myapps')}>
                      My Apps
              </Link>
              <Link href="/main-pages/appstore" className={`${styles.navlink} ${activePage === 'appstore' ? styles.active : ''}`} onClick={() => handlePageClick('appstore')}>
                      App Directory
              </Link>
              <Link href="/main-pages/faqs" className={`${styles.navlink} ${activePage === 'faqs' ? styles.active : ''}`} onClick={() => handlePageClick('faqs')}>
                      FAQs
              </Link>
              
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
  