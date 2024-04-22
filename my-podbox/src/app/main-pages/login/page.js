// components/Login.js
"use client";
import styles from "./page.module.css";
import Link from 'next/link';
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser';
import Image from 'next/image';
import inruptLogo from '../../../../public/inruptLogo.svg'
import solidLogo from '../../../../public/solidLogo.svg'
import trinPodLogo from '../../../../public/trinPodLogo.svg'

const loginPage = () => {

    // Function will check if session is logged in, if not - it will initiate the login process with the inputted pod provider
    const startInruptLogin = async () => {
      if (!getDefaultSession().info.isLoggedIn) {

        await login({
          // The provider for third party login¸
          oidcIssuer: "https://login.inrupt.com",
          // where I want the third-party to redirect to on my website once it's finished logging in and hands the session back to us
          redirectUrl: new URL("/main-pages/dashboard", window.location.href).toString(),
          // displays this on the third-party website login page, followed by "needs access to blah"
          clientName: "PodBox."
        });
      }
    };
  
      // Event handler for the button click
    const handleInruptClick = () => {
      startInruptLogin(); // Call the startInruptLogin function when the button is clicked
    };

    return (
      <div className={styles.main}>
        <div className={styles.mainPane}>
          <h1>Login to your PodBox!</h1>
          {/* Add any other content specific to your header */}
          <h2>Select your POD provider:</h2>

          <div className={styles.selectorContainer}>
            <div className={styles.selector} onClick={handleInruptClick}>
              <Image src={inruptLogo} alt="The Inrupt Logo"  height="80" />
              <p>Inrupt Podspaces</p>
            </div>
            <div className={styles.selector} onClick={handleInruptClick}>
            <Image src={solidLogo} alt="The Solid Logo" height='80' />
              <p>Solid Web</p>
            </div>
            <div className={styles.selector} onClick={handleInruptClick}>
            <Image src={solidLogo} alt="The Solid Logo" height='80' />
              <p>Solid Community</p>
            </div>
            <div className={styles.selector} onClick={handleInruptClick}>
            <Image src={trinPodLogo} alt="The TrinPod Logo" onClick={handleInruptClick} height='80' />
              <p>TrinPod</p>
            </div>
          </div>

          <select name="other providers"  className={styles.dropdown}>
            <option value=""disabled selected hidden> Other Provider? Choose here! </option>
            <option value="datapod"> DataPod </option>
            <option value="redpencil"> RedPencil </option>

          </select>

          <br />

        

        
        
          <div className={styles.divider}> </div>
          <h3> Don't have a POD? </h3>
          <div className={styles.divider}> </div>

          <br />
        

          <Link href="/main-pages/signup">
            {/* anything inside the Link tags will be clickable, in this case we made a button */}
            <button className={styles.signupButton}>Sign up!</button>
          </Link>

          </div>

        


        
      </div>

    );
  }
  
  export default loginPage;


