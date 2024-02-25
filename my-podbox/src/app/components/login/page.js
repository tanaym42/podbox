// components/Login.js
"use client";
import styles from "./page.module.css";
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser'

const loginPage = () => {

    // Function will check if session is logged in, if not - it will initiate the login process with the inputted pod provicer
    const startLogin = async () => {
      if (!getDefaultSession().info.isLoggedIn) {
        await login({
          oidcIssuer: "https://login.inrupt.com",
          redirectUrl: new URL("/homePage", window.location.href).toString(),
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
        <div className={styles.leftpain}>
          <h1>Login</h1>
          {/* Add any other content specific to your header */}
          <p>If you have a Pod provider, select it among the icons below!</p>

          <button className={styles.button} onClick={handleLoginClick}>Login Using Inrupt </button>          

        </div>
      </div>

    );
  }
  
  export default loginPage;


