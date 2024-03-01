// Everything that isn't in the top nav of the web page is in this file, the outermost page.js
// This is the initial landing page, before login. 
// This page's CSS file is page.module.css

// command which tells react to run code on the client-side rather than server side. A react/js thing
// keep this on top for most pages human-made just to be safe
"use client";
// importing styles from the css page, it's variable name is styles so we reference it with styles. later in this document
import styles from "./page.module.css";
// react.js routing, importing the link functionality from the next library 
import Link from 'next/link';

// don't need this yet, but may be useful later 
// import Image from "next/image";

// 
export default function Home() {

  return (
    // Everything but the navbar
    <main className={styles.wrapper}>
      {/* This is the first main wrapper, hosting the left pane and right pane */}
      <div className={styles.main}>
        {/* left pane */}
        <div className={styles.leftpane}>
          <h2>Welcome to PodBox!</h2>
          <h2>Take back control of your data.</h2>
          <h1> Main Value Proposition </h1>
          <p>Try to login to get started. Use one of the login buttons below. This is just a bunch of filler text for no reason at all but to be here. It has no purpose. It just is.</p>
          
          {/* Anything you want to link locally in react.js will need to be given a folder name, in which there needs to be a file named page.js. React will automatically pull this page.js file when passed a folder name (like components/login dir below) */}

          {/* So this is linking to the page.js inside of components/login */}
          <Link href="/components/login">
            {/* anything inside the Link tags will be clickable, in this case we made a button */}
            <button className={styles.button}>Login</button>
          </Link>
        </div>
       {/* right pane */}
        <div className={styles.rightpane}>
          {/* to add more content */}
          <p>Random graphic here</p>
        </div>
      </div>
    </main>

    // will need to add another main here to add more content below the panes 
  );
}
