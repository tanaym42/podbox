// src/SecondPage.js


"use client";
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";


// things I need from pod input; app name, app image, last modified, date created, link to app, link to app controls, link to view related data 

// I'll need to load the page and return all the data (with a delay), then add each piece of data into an json array, and then add elements to the document for each json item 

const faq = () => {
// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
        {/* Check if webId is null */}
          <div>
              {/* Will need to add placeholder and pull in user's name */}
              <h1>Frequently Asked Questions</h1>
          </div>

      <div className={styles.questionContainer}>
        <div className={styles.question}>
          <h2> Where the hell am I?</h2>
        </div>
        <div className={styles.question}>
          <h2>
            How did I get here?
          </h2>
        </div>
        <div className={styles.question}>
          <h2>
            How are babies made?
          </h2>
        </div>
        <div className={styles.question}>
          <h2>
            What is the answer to life, the universe, and everything? 
          </h2>
        </div>
        <div className={styles.question}>
          <h2>
            Can I have your phone number?
          </h2>
        </div>
        <div className={styles.question}>
          <h2>
            Why do we call it oven when we of in the cold food out hot eat the food? 
          </h2>
        </div>
        <div className={styles.question}>
          <h2>

          </h2>
        </div>
        <div className={styles.question}>
          <h2>

          </h2>
        </div>
      </div>
    </div>
  );
};

export default faq;