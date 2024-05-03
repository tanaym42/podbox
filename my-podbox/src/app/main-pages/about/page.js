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
              <h1>About us</h1>
          </div>

      <div className={styles.questionContainer}>
      We are a team of students from the University of California, Berkeley, united by our shared interest in exploring cutting-edge technologies that have the potential to reshape the future of the internet.
      </div>
    </div>
  );
};

export default faq;