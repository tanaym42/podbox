// src/SecondPage.js
"use client";
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import jsonData from './data.json'

// things I need from pod input; app name, app image, last modified, date created, link to app, link to app controls, link to view related data 
function Card({ item }) {
  return (
      <div className={styles.card}>
          <div className={styles.imagecontainer}>
              <img src={item.image} alt="Item Image" className="image" />
          </div>
          <div className={styles.content}>
              <h2 className={styles.title}>{item.title}</h2>
              <div className={styles.info}>
                  <p>Last modified: {item.lastModified}</p>
                  <p>Visit website: {item.website}</p>
              </div>
              <div className={styles.buttons}>
                  <button className={styles.button}>Access controls</button>
                  <button className={styles.button}>View related data</button>
              </div>
          </div>
      </div>
  );
}


// I'll need to load the page and return all the data (with a delay), then add each piece of data into an json array, and then add elements to the document for each json item 

const myApps = () => {
// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
        {/* Check if webId is null */}
          <div>
              {/* Will need to add placeholder and pull in user's name */}
              <h1>My Apps</h1>

                <div className="grid-container">
                {jsonData.map((item, index) => (
                  <Card key={index} item={item} />
                ))}
                </div>
          </div>
    </div>
  );
};

export default myApps;