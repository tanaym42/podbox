"use client";
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";


const singleapp = () => {
// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
        {/* Check if webId is null */}
      <div className={styles.leftPane}>
        <div className={styles.appTitle}>
          Media Kraken
        </div>
        <div className={styles.appBody}>
          <h2> By Noel De Martin </h2>
          
          <br />

          <p>Keep track of your movies and make your own collection. </p>

        </div>
        <div className={styles.accessControl}>
          <div className={styles.mainToggle}>

          </div>
          <div className={styles.controlOptions}>

          </div>
        </div>


      </div>
      <div className={styles.rightPane}>
        <div className={styles.thumbnailContainer}>

        </div>
        <div className={styles.accessInfo}>

        </div>
        <div className={styles.dataButtons}>

        </div>
        <div className={styles.infoPane}>
          
        </div>
      </div>
    </div>
  );
};

export default singleapp;