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
// need to import Image in order to embed images linked in the public folder
import Image from 'next/image';
// and image imports for bottom card thumbnails
import dataImg from '../../public/home_data.svg'
import interopImg from '../../public/home_interop.svg'
import secureShareImg from '../../public/home_securesharing.svg'

// don't need this yet, but may be useful later 
// import Image from "next/image";

// 
export default function Home() {

  return (
    // Everything but the navbar
    <main className={styles.wrapper}>
      {/* This is the first main wrapper, hosting the left pane and right pane */}
      <div className={styles.topmatter}>
        {/* left pane */}
        <div className={styles.leftpane}>
          <h1> Take control of your data, your way. </h1>
          <p> Embrace data empowerment with PodBox. Organize, manage, and unleash the potential of your data, on your terms. </p>
          
          {/* Anything you want to link locally in react.js will need to be given a folder name, in which there needs to be a file named page.js. React will automatically pull this page.js file when passed a folder name (like components/login dir below) */}

          
        {/* So this is linking to the page.js inside of components/login */}
          <Link href="/main-pages/signup">
            {/* anything inside the Link tags will be clickable, in this case we made a button */}
            <button className={styles.signUpButton}>Sign Up</button>
          </Link>
          <Link href="/main-pages/login">
            {/* anything inside the Link tags will be clickable, in this case we made a button */}
            <button className={styles.loginButton}>Login with your POD</button>
          </Link>
          
        </div>
       {/* right pane */}
        <div className={styles.rightpane}>
          {/* to add more content */}
          <img src="podboxDiagram.svg" alt="A diagram showing the functionality of PodBox."></img>
        </div>
      </div>

      <div className={styles.bottommatter}>
        <h2> Why use PodBox? </h2>

        <div className ={styles.cardContainer}>
          <div className = {styles.card}>
            <div className = {styles.cardImg}>
              <Image src={dataImg} alt="A hand holding a key" />
            </div>
            <p className={styles.cardTitle}>Data Ownership</p>
            <p className={styles.cardText}>View and manage access to all of your data across apps.</p>
          </div>

          <div className = {styles.card}>
            <div className = {styles.cardImg}>
              <Image src={interopImg} alt="Gear interlocking in a graph with multiple objects" />
            </div>
            <p className={styles.cardTitle}>Interoperability</p>
            <p className={styles.cardText}>Carry your data as you switch from one app to another.</p>
          </div>

          <div className = {styles.card}>
            <div className = {styles.cardImg}>
              <Image src={secureShareImg} alt="Two pages of paper with arrows drawn between them, with a lock" />
            </div>
            <p className={styles.cardTitle}>Secure Sharing</p>
            <p className={styles.cardText}>You decide who has access to your data at all times.</p>
          </div>
        </div>

      </div>
    </main>



    // will need to add another main here to add more content below the panes 
  );
}
