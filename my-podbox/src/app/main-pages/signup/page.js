// src/SecondPage.js


"use client";
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import Image from 'next/image';
import beanImage from "../../../../public/beanDiagram.svg"
import learnMoreImage from "../../../../public/signUp_learnMore.svg"


// things I need from pod input; app name, app image, last modified, date created, link to app, link to app controls, link to view related data 

// I'll need to load the page and return all the data (with a delay), then add each piece of data into an json array, and then add elements to the document for each json item 

const goLearnMore = () => {
  window.location.replace("https://solidproject.org/users/get-a-pod");
}
const signup = () => {
// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
      <div className={styles.topmatter}>
        <div>
            {/* Will need to add placeholder and pull in user's name */}
            <h1>Get started with your POD for free in just one step. </h1>
        </div>

        <div className={styles.dropdownContainer}>
          <br />
          <select name="other providers"  className={styles.dropdown}>
            <option value=""disabled selected hidden> Select POD Provider </option>
            <option value="Inrupt"> Inrupt </option>
            <option value="PodCommunity"> PodCommunity </option>
            <option value="PodWeb"> PodWeb </option>
            <option value="TrinPod"> TrinPod </option>
            <option value="datapod"> DataPod </option>
            <option value="redpencil"> RedPencil </option>

          </select>

          <button>
            Register
          </button>
          
        </div>
        <p>Already have an account? <a href="/main-pages/login">Log in!</a></p>
      </div>
      <div className={styles.bottommatter}>
        <div>
          <br />
            <br />
            <br />
          <h2>
            What is a POD?
          </h2>
          <p>

            PODs serve as your data storage space, accommodating any type of data, and are established through a POD provider. 
            <br />
            <br />
            Each POD is assigned a unique WebID upon creation, a crucial identifier for future access. To obtain a WebID, register on the provider's site, note your WebID, and come back to PodBox and log in with your new POD!
          </p>
            <div className={styles.learnMore}>
              <Image src={learnMoreImage} alt="" onClick={goLearnMore}/>
            </div>
        </div>
        <div className={styles.diagram}>
          
          <Image src={beanImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default signup;