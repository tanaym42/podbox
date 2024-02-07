"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser'
// import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import Link from 'next/link';

export default function Home() {

  const startLogin = async () => {
    // Start the Login Process if not already logged in.
    if (!getDefaultSession().info.isLoggedIn) {
      await login({
        oidcIssuer: "https://login.inrupt.com",
        redirectUrl: new URL("/homePage", window.location.href).toString(),
        clientName: "My application"
      });
    }
  };

    // Event handler for the button click
  const handleLoginClick = () => {
    startLogin(); // Call the startLogin function when the button is clicked
  };
  

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Try to login to get started. Use one of the login buttons below. 
        </p>
        
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>

          <span>

              Inrupt Login


            -&gt;</span>

          </h2>
          <p>Link POD provided by Inrupt.net</p>
        </div>

        <div className={styles.card}>
          <h2>
          <span>

              SC Login
            -&gt;</span>
          </h2>
          <p>Link POD provided by Solidcommunity.net</p>
        </div>

          <button onClick={handleLoginClick}>Go to Second Page</button>

  
      </div>
    </main>
  );
}
