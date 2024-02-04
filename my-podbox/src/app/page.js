"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Try to login to get started. Use one of the login buttons below. 
        </p>
        
        <div>

        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>
          <SessionProvider sessionId="some-id">
            <LoginButton
              oidcIssuer="https://inrupt.net"
              redirectUrl="https://localhost:3000/"
            />
            
        </SessionProvider><span>-&gt;</span>
          </h2>
          <p>Link POD provided by Inrupt.net</p>
        </div>

        <div className={styles.card}>
          <h2>
          <SessionProvider sessionId="some-id-2">
            <LoginButton
              oidcIssuer="https://solidcommunity.net"
              redirectUrl="https://localhost:3000/"
            />
          </SessionProvider><span>-&gt;</span>
          </h2>
          <p>Link POD provided by Solidcommunity.net</p>
        </div>

  
      </div>
    </main>
  );
}
