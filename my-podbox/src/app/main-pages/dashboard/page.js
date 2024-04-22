// src/SecondPage.js


"use client";
import React, { useEffect, useState } from 'react';
// this handles the redirect from the third party oidc provider
import { handleIncomingRedirect, onSessionRestore } from '@inrupt/solid-client-authn-browser';
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getPodUrlAll } from "@inrupt/solid-client";
import { fetch } from '@inrupt/solid-client-authn-browser';
import styles from "./page.module.css";
import { acp_ess_2, solidDatasetAsTurtle } from "@inrupt/solid-client";

import Image from 'next/image';
import placeHolderImage from '../../../../public/placeHolderImage.png'

// These are all for the read and write service
import {
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  getUrlAll
} from "@inrupt/solid-client";

// This is for testing of ACL stuff, the above is for ACR
import {
  getSolidDatasetWithAcl,
  getPublicAccess,
  universalAccess
} from "@inrupt/solid-client";

import { urlToUrlWithoutFlightMarker } from 'next/dist/client/components/app-router';


// things I need from pod input; app name, app image, last modified, date created, link to app, link to app controls, link to view related data 

// I'll need to load the page and return all the data (with a delay), then add each piece of data into an json array, and then add elements to the document for each json item 

const homePage = () => {

  // A bunch of different state variable 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [webId, setWebId] = useState(null);

  const session = getDefaultSession();

  async function fetchThingList(webId) {
    
    const podUrl = await getPodUrlAll(webId, { fetch: fetch });
    console.log(podUrl[0])
    const myThingList = await getSolidDataset(
        podUrl[0],                     // Here, replace it with my podurl information. 
        { fetch: fetch }          // fetch from authenticated session
      );
    console.log(myThingList);
}
  
  // Inside the useEffect hook, placed the login completion and data fetching since they are required for re-rendering. 
  // useEffect is a react thing that tells the browser what to re-do in certain conditions
  useEffect(() => {

    // The function will handle the login authentication, set the WebID and isLoggedIn states for further use. 
    const completeLogin = async () => {
    
      // IMPORTANT
      // This takes in the information about my session 
      await handleIncomingRedirect();
      console.log("Check complete, you are being redirected.");

      // Call an asynchronous function when the browser receives some information ('info').
      // The function 'handleIncomingRedirect' is implemented to handle incoming redirects,
      // as documented here: https://docs.inrupt.com/developer-tools/api/javascript/solid-client-authn-browser/functions.html#handleincomingredirect 
      // The 'restorePreviousSession' option is set to true to attempt to restore the previous session.

      handleIncomingRedirect({
        // this is how the system knows to use the same session that was already logged in when you hit refresh
        restorePreviousSession: true
          // basically a "try" in python, we haven't written rejection case yet
          }).then(async (info) => {
            // console.log(`Logged in with WebID [${info.webId}]`)
            // console.log("I reach here.")  
            // console.log(info)    
          })
        // check if the user is logged in
        if (session.info.isLoggedIn) {
        
        // Sets the state of webId and setIsLoggedIn for further use. 
        setIsLoggedIn(true);
        setWebId(session.info.webId);
        webId && fetchThingList(webId);
      }
  };
  
  // useEffect hook to run completeLogin on component mount
  
  completeLogin()
  //fetchSomeData();

  // "when my webId changes, that's when I want you to rerun everything in useEffect"
  }, [webId]); // The empty dependency array ensures it runs once on mount

const recentApps = [
  {"app_name": "Media Kraken" ,"image_link": "https://www.google.com", "app_link": "https://www.google.com", "last_accessed" : "2024-04-20", "date_added": "2023-04-20", "controls_link": "https//www.google.com", "relatedData_Link": "https://www.google.com"},

  {"app_name": "Liqid Chat" ,"image_link": "https://www.google.com", "app_link": "https://www.google.com", "last_accessed" : "2024-04-20", "date_added": "2023-04-20", "controls_link": "https//www.google.com", "relatedData_Link": "https://www.google.com"},

  {"app_name": "Solid Weather" ,"image_link": "https://www.google.com", "app_link": "https://www.google.com", "last_accessed" : "2024-04-20", "date_added": "2023-04-20", "controls_link": "https//www.google.com", "relatedData_Link": "https://www.google.com"},

  {"app_name": "Solid Calendar" ,"image_link": "https://www.google.com", "app_link": "https://www.google.com", "last_accessed" : "2024-04-20", "date_added": "2023-04-20", "controls_link": "https//www.google.com", "relatedData_Link": "https://www.google.com"},
  
  {"app_name": "Golf Companion Assistant" ,"image_link": "https://www.google.com", "app_link": "https://www.google.com", "last_accessed" : "2024-04-20", "date_added": "2023-04-20", "controls_link": "https//www.google.com", "relatedData_Link": "https://www.google.com"}
];


const recentData = [
  {"item_name": "Cheesecake Recipe" ,"type":"file", "app_link": "https://www.google.com", "last_accessed" : "2024-04-20", "date_added": "2023-04-20", "controls_link": "https//www.google.com", "relatedData_Link": "https://www.google.com"},

  {"item_name": "My Recipes" ,"type":"dir", "app_link": "https://www.google.com", "last_accessed" : "2024-04-20", "date_added": "2023-04-20", "controls_link": "https//www.google.com", "relatedData_Link": "https://www.google.com"},

  {"item_name": "Catan Rules" ,"type":"file", "app_link": "https://www.google.com", "last_accessed" : "2024-04-20", "date_added": "2023-04-20", "controls_link": "https//www.google.com", "relatedData_Link": "https://www.google.com"},

  {"item_name": "Favorite Games" ,"type":"dir", "app_link": "https://www.google.com", "last_accessed" : "2024-04-20", "date_added": "2023-04-20", "controls_link": "https//www.google.com", "relatedData_Link": "https://www.google.com"},
  
  {"item_name": "Why Tanay is so Cool" ,"type":"file", "app_link": "https://www.google.com", "last_accessed" : "2024-04-20", "date_added": "2023-04-20", "controls_link": "https//www.google.com", "relatedData_Link": "https://www.google.com"}
];

const userInfo = {
  "name": "Jade Smithjonesenson",
  "email": "jadeluvspuppies88@aol.com",
  "webID": "id.inrupt.com/jadesPOD"
}

const userStorage = {
  // might need to do some sort of conversion between KB/MB/GB here? 
  "space": "5 GB",
  "totalApps": "23",
  "containers": "8"
}

// make sure to remove this when Tanay adds functionality 
const recentAppsString = JSON.stringify(recentApps); 

const recentDataString = JSON.stringify(recentData); 

const userInfoString = JSON.stringify(userInfo);

const userStorageString = JSON.stringify(userStorage)


// writing to local storage
localStorage.setItem('userApps', recentAppsString);
localStorage.setItem('userData', recentDataString);
localStorage.setItem('userInfo', userInfoString);
localStorage.setItem('userStorage', userStorageString);



// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
        {/* Check if webId is null */}
        {!webId ? (
          <p>Loading...</p>
        ) : (
          
          <div className={styles.main}>
              {/* Will need to add placeholder and pull in user's name */}
              <h1>Name's PodBox</h1>
              <h2>Recent Apps</h2>
            
          
            
              <h2>Recent Data</h2>
              <p>Cards of hardcoded apps can go here.</p>
            
          </div>
          
        )}
      
    </div>
  );
};

export default homePage;