// components/Header.js
"use client";
import styles from "./page.module.css";
import Image from 'next/image';
import Link from 'next/link';
import PodBoxLogo from '../../../../public/PodBoxLogo2.svg'
import PodBoxText from "../../../../public/PodBoxText.svg"

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../../auth';


const TopNav = () => {
    // State to keep track of the active page
    const [activePage, setActivePage] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const { loginCheck, authWebID } = useAuth();

    const handleCopy = () => {
      const textToCopy = authWebID;
      // Copy text to clipboard
      navigator.clipboard.writeText(authWebID)
        .then(() => {
          console.log('Text copied to clipboard:', authWebID);
          setCopySuccess(true);
          // Optionally, show a success message or perform other actions

          setTimeout(() => {
            setCopySuccess(false);
          }, 2000); // 4 seconds
        })
        .catch(err => {
          console.error('Failed to copy text to clipboard:', err);
          // Optionally, show an error message or perform other actions
        });
    };

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
              <Link href = "/">
                <Image src={PodBoxLogo} onClick={() => handlePageClick('landing')} alt="PodBox Logo" height="50" priority/>
              </Link>
            </div>
            <div>
              <Link href = "/">
                <Image src={PodBoxText} onClick={() => handlePageClick('landing')} alt="PodBox Logo" height="50" priority/>
              </Link>
            </div>
            
            
        </div>

        {loginCheck ? (

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
              <button onClick={() => handleCopy()} disabled={copySuccess} className={styles.webIdButton}> {copySuccess ? 'Copied !' : 'Copy WebID'} </button>
            </div>
          </div>


        ) : (

          <Link href="/main-pages/faqs" className={`${styles.navlinkLoggedOut}`} onClick={() => handlePageClick('faqs')}>
                    <button className={styles.faqButton}> FAQs </button>
            </Link>

        )}

        
        {/* Add any other content specific to your header */}
      </div>

    );
  }
  
  export default TopNav;
  