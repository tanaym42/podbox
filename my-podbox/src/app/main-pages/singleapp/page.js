// src/SecondPage.js


"use client";
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";


// things I need from pod input; app name, app image, last modified, date created, link to app, link to app controls, link to view related data 

// I'll need to load the page and return all the data (with a delay), then add each piece of data into an json array, and then add elements to the document for each json item 

const singleapp = () => {
// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
        {/* Check if webId is null */}
          <div>
              {/* Will need to add placeholder and pull in user's name */}
              <h1>Check out this cool app! </h1>
          </div>
    </div>
  );
};

export default singleapp;