// components/Login.js
"use client";
import styles from "./page.module.css";
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser'

const loginPage = () => {

    // Function will check if session is logged in, if not - it will initiate the login process with the inputted pod provider
    const startLogin = async () => {
      if (!getDefaultSession().info.isLoggedIn) {

        await login({
          // The provider for third party login¸
          oidcIssuer: "https://login.inrupt.com",
          // where I want the third-party to redirect to on my website once it's finished logging in and hands the session back to us
          redirectUrl: new URL("/main-pages/home", window.location.href).toString(),
          // displays this on the third-party website login page, followed by "needs access to blah"
          clientName: "PodBox."
        });
      }
    };
  
      // Event handler for the button click
    const handleLoginClick = () => {
      startLogin(); // Call the startLogin function when the button is clicked
    };

    return (
      <div className={styles.main}>
        <div className={styles.leftpane}>
          <h1>Log In to your PodBox!</h1>
          {/* Add any other content specific to your header */}
          <h2>Select your POD provider:</h2>

          <div className={styles.selectorContainer}>
            <div className={styles.selector}>
              <img src="inruptLogo.svg" alt="The Inrupt Logo" onClick={handleLoginClick}>
              </img>
              <p>Inrupt Podspaces</p>
            </div>
            <div className={styles.selector}>
              <img src="solidLogo.svg" alt="The Solid Community Logo">
              </img>
              <p>Solid Web</p>
            </div>
            <div className={styles.selector}>
              <img src="solidLogo.svg" alt="The Solid Community Logo">
              </img>
              <p>Solid Community</p>
            </div>
            <div className={styles.selector}>
              <img src="trinPodLogo.svg" alt="The trinPod Logo">
              </img>
              <p>TrinPod</p>
            </div>
          </div>

          <select name="other providers"  className={styles.dropdown}>
            <option value=""disabled selected hidden> Other Provider? Choose here </option>
            <option value="datapod"> DataPod </option>
            <option value="redpencil"> RedPencil </option>

          </select>


        </div>
      </div>

    );
  }
  
  export default loginPage;


