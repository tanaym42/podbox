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


const homePage = () => {

  // A bunch of different state variable 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [webId, setWebId] = useState(null);

  const session = getDefaultSession();
  
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
      }
  };
  
  // useEffect hook to run completeLogin on component mount
  
  completeLogin()
  //fetchSomeData();

  // "when my webId changes, that's when I want you to rerun everything in useEffect"
  }, [webId]); // The empty dependency array ensures it runs once on mount

// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
      <div className={styles.main}>
        {/* Check if webId is null */}
        {!webId ? (
          <p>Loading...</p>
        ) : (
          
          <div className={styles.main}>
            <div className={styles.main}>
              <h1>Welcome to your PodBox, Name!</h1>
              <p>Whole bunch of random text underneath.</p>
            </div>
          
            <div className={styles.main}>
              <h1>Suggested apps</h1>
              <p>Cards of hardcoded apps can go here.</p>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default homePage;