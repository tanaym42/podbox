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


