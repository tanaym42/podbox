// src/SecondPage.js


"use client";
import React, { useEffect, useState } from 'react';
// this handles the redirect from the third party oidc provider
import { handleIncomingRedirect, onSessionRestore } from '@inrupt/solid-client-authn-browser';
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getPodUrlAll } from "@inrupt/solid-client";
import { fetch } from '@inrupt/solid-client-authn-browser';
import styles from "./page.module.css";
import { useAuth } from '../../auth';

import { acp_ess_2, solidDatasetAsTurtle } from "@inrupt/solid-client";

import Image from 'next/image';
import mediaImage from '../../../../public/dashboard_mediaApp.svg';
import docImage from '../../../../public/dashboard_docApp.svg';
import mgmtImage from '../../../../public/dashboard_mgmtApp.svg';
import socialImage from '../../../../public/dashboard_socialApp.svg';

// These are all for the read and write service
import {
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  getUrl,
  getUrlAll, 
  getContainedResourceUrlAll
} from "@inrupt/solid-client";

// things I need from pod input; app name, app image, last modified, date created, link to app, link to app controls, link to view related data 

// Below is the card for the display of app information, that can be re-used. 

function AppCard({ item }) {

  //Load the required values from the solid dataset
  let app_card_name = getStringNoLocale(item, 'https://schema.org/name')
  let app_card_abstract = getStringNoLocale(item, 'https://schema.org/abstract')
  let app_card_genre = getStringNoLocale(item, 'https://schema.org/applicationCategory')
  let app_card_logourl = getUrl(item, 'https://schema.org/thumbnailUrl')

  return (
    <div className={styles.appCard}>
      <div className={styles.appThumbnail}>
      {/* img here */}
        <img src={app_card_logourl} alt="The Notepod Logo"></img>
      </div>
    <div className={styles.appCardBody}>
      <div className={styles.banner}>
        {app_card_genre}
      </div>
      <div> <h3> {app_card_name} </h3> </div>
      <div> <p> {app_card_abstract} </p> </div>
    </div>
  </div>

  );
}


const homePage = () => {

  // A bunch of different state variable 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [webId, setWebId] = useState(null);
  const [suggestedAppUrls, setSuggestedAppUrls] = useState(null);
  const [prevSuggestedAppUrls, setPrevSuggestedAppUrls] = useState(null);
  const [appContainerName, setAppContainerName] = useState('MyApps_Test_No_2');
  const [appContainerUrl, setAppContainerUrl] = useState('https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/App_Catalogue');
  const { loginCheck, updateLoginCheck } = useAuth();
  


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
            if (session.info.isLoggedIn) {
        
              // Sets the state of webId and setIsLoggedIn for further use. 
              setIsLoggedIn(true);
              setWebId(session.info.webId);
              updateLoginCheck(true, webId);
          
              // What I need to do here, basically, is create function that runs on every start. 
              // This will basically find the MyApps container using only the webID. Then it will store the urls from that container in some state. 
              // For every item in the state list, we will open some card and 
            }

          })
        // check if the user is logged in

  };

  async function fetchMyAppsUrl(webId) {
    
    const podUrl = await getPodUrlAll(webId, { fetch: fetch });
    console.log(podUrl[0])
    const myThingList = await getSolidDataset(
        podUrl[0],                     // Here, replace it with my podurl information. 
        { fetch: fetch }          // fetch from authenticated session
      );

    let temp = getContainedResourceUrlAll(myThingList);

    temp.forEach (containerUrl => {
      if (containerUrl.endsWith(appContainerName)) {
        // If found, set the result to true and break out of the loop
        setAppContainerUrl(containerUrl);
      }
    });
  }

  async function fetchAppInfo () {
    // console.log('This is the WebID it is trying to parse.')
    // console.log(webId)
    if (webId !== undefined && webId !== null) {
      await fetchMyAppsUrl(webId);
    } else {
      console.log('The fetchAppUrl function is not running because webID is undefined stil. ')
    }
  }


  async function fetchAppThingList(url) {

    // console.log("This is the AppUrl we trying to read:");
    // console.log(url)

    const myThingList = await getSolidDataset(
        url,                     // Here, replace it with my podurl information. 
        { fetch: fetch }          // fetch from authenticated session
      );

    // console.log('This is the thing list in the App container:')
    // console.log(myThingList);

    const myAllThing = await getThingAll(
      myThingList,                     // Here, replace it with my podurl information. 
      { fetch: fetch }          // fetch from authenticated session
    );

    // console.log('This is the stuff inside it?')
    // console.log(myAllThing);


    // let temp = myThingList.graphs.default
    // let appUrlList = Object.keys(temp)

    // let temp = getContainedResourceUrlAll(myThingList);
    // console.log('These are the contained resources in the App container: ')
    // console.log(myAllThing);

    await setSuggestedAppUrls(myAllThing);

  }

  async function createSuggestedList () {
    // console.log('Entering createlist with the following App Url:')
    // console.log(appContainerUrl);
    if (appContainerUrl !== undefined && appContainerUrl !== null) {
      await fetchAppThingList(appContainerUrl);
      
      
    } else {
      console.log('The fetchAppUrl function is not running because App URL is undefined stil. ')
    }

  }

  async function fetchPublicApps () {
    // console.log('Entering createlist with the following App Url:')
    // console.log(appContainerUrl);
    if (appContainerUrl !== undefined && appContainerUrl !== null) {
      await fetchAppThingList(appContainerUrl);
      
      
    } else {
      console.log('The fetchAppUrl function is not running because App URL is undefined stil. ')
    }

  }

  
  // useEffect hook to run completeLogin on component mount
  

  completeLogin().then(fetchPublicApps).then(() => {
    console.log('App list state updated.');
  });
  

  
  //fetchSomeData();

  // "when my webId changes, that's when I want you to rerun everything in useEffect"
}, [webId, appContainerUrl]); // The empty dependency array ensures it runs once on mount


// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
        {/* Check if webId is null */}
        {/* {!webId ? (
          <p>Loading...</p>
        ) : ( */}
          <br />
          <div>
              {/* Will need to add placeholder and pull in user's name */}
              <h1>Welcome to your PodBox!</h1>
              <div className={styles.intro}>
                <p>
                  Effortlessly access all your data and applications from your dashboard. Whether you’d like to find a new app to try, download your data, or manage app access controls, your dashboard is the go-to place for POD management. 
                
                  <br />
                  <br />
                  First, try out an app to create your first piece of data in your POD! 
                </p>
                
              </div>

              <h1>Suggested Apps</h1>
              
              <div className={styles.appContainer}>

                  {suggestedAppUrls && suggestedAppUrls.length > 0 ? (
                  <ul>
                    {/* Use the map function to iterate over the list and render each item */}
                    {suggestedAppUrls.map((item, index) => (
                      <AppCard key={index} item={item} />
                    ))}
                  </ul>
                  ) : (
                  <p>Your suggested apps are loading!</p>
                  )}
                  </div>
              </div>
          </div>

  );
};

export default homePage;