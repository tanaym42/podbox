// src/SecondPage.js
"use client";
import React, { useEffect, useState } from 'react';
import { handleIncomingRedirect, onSessionRestore } from '@inrupt/solid-client-authn-browser';
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getPodUrlAll } from "@inrupt/solid-client";
import { fetch } from '@inrupt/solid-client-authn-browser';
import styles from "./page.module.css";

// These are all for the read and write service
import {
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  getUrlAll
} from "@inrupt/solid-client";
import { urlToUrlWithoutFlightMarker } from 'next/dist/client/components/app-router';


const homePage = () => {

  // A bunch of different state variable 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [webId, setWebId] = useState(null);
  const [movieDataUrl, setMovieDataUrl] = useState('https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/movies/inception-2010');
  const [movieList, setMovieList] = useState();
  const [movieNameList, setMovieNameList] = useState();
  const [inputUrl, setInputUrl] = useState('');


  const session = getDefaultSession();

  const fetchUrlData = async (inputUrl) => {
    
    if (!isLoggedIn) {

      console.log('Not logged in yet.');
 
    } else {

      const movieList = await getSolidDataset (
        inputUrl, 
        {fetch : fetch}
      );

      console.log('This is the Soliddataset representing all movies in the container.')
      const urlList = Object.keys(movieList.graphs.default);
      console.log(urlList);

      // Then, I want to fetch the url for every solid dataset inside my container ('movieList') and for each, 
      // add the name to a new list which I will be added to some state movieNames and parsed in HTML
      
      const tempMovieNameList = [];

      for (const url of urlList) {
        console.log('This is the current url being iterated over.')
        console.log(url)

        if (url === inputUrl) {
          continue;
        } else {
          const myDataset = await getSolidDataset(
            url,
            { fetch: fetch } 
          );
        
          console.log('This is where I am trying to return the dataset.')
          console.log(myDataset);
        
          const movieInformation = await getThing (
            myDataset, 
            `${url}#it`
          )
  
          console.log(movieInformation);
        
          const movieName = getStringNoLocale(movieInformation, "https://schema.org/name")
          console.log(movieName);
          tempMovieNameList.push(movieName);
        }   
      }
      console.log('Printing a list of only the names of every movie.')
      console.log(tempMovieNameList);
      setMovieNameList(tempMovieNameList);
    }
      
  }

  // Inside the useEffect hook, placed the login completion and data fetching since they are required for re-rendering. 
  useEffect(() => {

    // The function will handle the login authentication, set the WebID and isLoggedIn states for further use. 
    const completeLogin = async () => {
    
      await handleIncomingRedirect();
      console.log("Check complete, you are being redirected.");

      // Call an asynchronous function when the browser receives some information ('info').
      // The function 'handleIncomingRedirect' is implemented to handle incoming redirects,
      // as documented here: https://docs.inrupt.com/developer-tools/api/javascript/solid-client-authn-browser/functions.html#handleincomingredirect 
      // The 'restorePreviousSession' option is set to true to attempt to restore the previous session.

      handleIncomingRedirect({
        restorePreviousSession: true
          }).then(async (info) => {
            console.log(`Logged in with WebID [${info.webId}]`)
            console.log("I reach here.")      
          })
    
        if (session.info.isLoggedIn) {
        
        // Sets the state of webId and setIsLoggedIn for further use. 

        setIsLoggedIn(true);
        setWebId(session.info.webId);
      }
  };
  
  // useEffect hook to run completeLogin on component mount
  
  completeLogin()
  //fetchSomeData();

  }, [webId]); // The empty dependency array ensures it runs once on mount

  const handleButtonClick = async () => {
    try {
      const response = await fetchUrlData(inputUrl);
      // Do something with the response if needed
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.leftpain}>
        <h1>Welcome to your Pod!</h1>
  
        {/* Check if webId is null */}
        {!webId ? (
          <p>Loading...</p>
        ) : (
          <div className=''>
            <p>Is the session logged in? {isLoggedIn.toString()}</p>
            {isLoggedIn && <p>If yes, this is the session webID {webId}</p>}
  
            <p>This is the list of movies you made in MovieKraken:</p>
  
            <ul>
              {movieNameList ? (
                movieNameList.map((item, index) => (
                  <li key={index}>
                    {item ? (
                      <p>{item}</p>
                    ) : (
                      <p>Invalid URL</p>
                    )}
                  </li>
                ))
              ) : (
                <p>Enter a Url in the right pane to see the movies!</p>
              )}
            </ul>
          </div>
          
        )}
      </div>
      <div className={styles.rightpain}>
        <p>Input the link of your movies folder created in Media Kraken here.</p>
        <input 
        type="text" 
        value={inputUrl} 
        onChange={(e) => setInputUrl(e.target.value)} 
        placeholder="Enter URL" 
        />
        <button onClick={handleButtonClick}>Submit</button>
      </div>
    </div>
  );
};

export default homePage;