"use client";
import styles from "./page.module.css";
import Image from 'next/image';

import launchOutsideImg from '../../../../public/launchOutside.svg'

const goMediaKraken = () => {
  window.open(
    "https://noeldemartin.github.io/media-kraken/login", "_blank");
}


const singleapp = () => {
// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
        {/* Check if webId is null */}
      <div className={styles.leftPane}>
        <div className={styles.appTitle}>
          <h2>Media Kraken</h2>
          <Image src={launchOutsideImg} alt="" height="30" onClick={goMediaKraken} />
        </div>
        <div className={styles.appBody}>
          <h3> By Noel De Martin </h3>

          <p>Keep track of your movies and make your own collection. This app accesses movie databases to allow you to track, mark as watched, and create collections of your choice with movies from all over the world.</p>
          <br />

        </div>
        <div className={styles.accessControl}>
          <h2>Access Controls</h2>
          <div className={styles.mainToggle}>
            <p>Allow Media Kraken to access my Pod.</p>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span class={styles.slider}></span>
            </label>
          </div>

          <br />
          
          <div className={styles.controlOptions}>
            <h4>Control Options</h4>
            <label className={styles.switch}>
              Read
              <input type="checkbox" />
              <span class={styles.slider}></span>
            </label>

            <br />

            <label className={styles.switch}>
              Write
              <input type="checkbox" />
              <span class={styles.slider}></span>
            </label>

            <br />

            <label className={styles.switch}>
              Append
              <input type="checkbox" />
              <span class={styles.slider}></span>
            </label>

            <br />

            <label className={styles.switch}>
              Control
              <input type="checkbox" />
              <span class={styles.slider}></span>
            </label>

            <br />
            
          </div>
        </div>
      </div>


      <div className={styles.rightPane}>
        <div className={styles.thumbnailContainer}>
        <img src="https://noeldemartin.github.io/media-kraken/img/icons/android-chrome-512x512.png" alt="The Media Kraken Logo"></img>

        </div>
        <div className={styles.accessInfo}>
          <p>Last modified: 05/06/24</p>
          <p>First access: 02/14/24</p>

        </div>
        <div className={styles.dataButtons}>

          <button className={styles.downloadButton}>Download</button>
          <button className={styles.relatedButton}>View Related Data</button>

        </div>
        <div className={styles.infoPane}>
          <p><a href="main-pages/faqs"> What can I do with my data?</a></p>

          <p><a href="main-pages/faqs"> How do I revoke access to my pod?</a></p>

        </div>
      </div>
    </div>
  );
};

export default singleapp;