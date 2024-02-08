// src/SecondPage.js
"use client";
import React, { useEffect, useState } from 'react';
import { handleIncomingRedirect, onSessionRestore } from '@inrupt/solid-client-authn-browser';
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getPodUrlAll } from "@inrupt/solid-client";
import { fetch } from '@inrupt/solid-client-authn-browser'

// These are all for the read and write service
import {
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  getUrlAll
} from "@inrupt/solid-client";

// import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
//

const homePage = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [webId, setWebId] = useState(null);
  const [movieDataUrl, setMovieDataUrl] = useState('https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/movies/');
  const [movieList, setMovieList] = useState();



  useEffect(() => {

  let random = null;  
  const completeLogin = async () => {
    await handleIncomingRedirect();
    console.log("Check complete");

    handleIncomingRedirect({
      restorePreviousSession: true
    }).then(async (info) => {
      // console.log(`Logged in with WebID [${info.webId}]`)
      // console.log("I reach here.")
      
      if (webId !== null) {
        const pods = await getPodUrlAll(webId, { fetch: fetch });
        // console.log("I reach here as well.");
        console.log(pods);

        const myDataset = await getSolidDataset(
          movieDataUrl,
          { fetch: fetch } 
            // fetch from authenticated session
        );
      
        console.log(myDataset);
        
        const movieList = getThingAll(
          myDataset,
          `${movieDataUrl}#title`
        );

        console.log(typeof movieList)
        console.log(movieList[0].url)
        console.log(typeof movieList[0].url)

      }
      
    })

    const session = getDefaultSession();

    // console.log(session)
    // console.log(session.info)
    
    if (session.info.isLoggedIn) {
      // console.log(session.info.webId)

      setIsLoggedIn(true);
      setWebId(session.info.webId);
      setMovieList(movieList);
    }

  };

  // useEffect hook to run completeLogin on component mount
  
    completeLogin();
  }, [webId]); // The empty dependency array ensures it runs once on mount

  

  return (
    <div>
      <h1>Welcome to your Pod!</h1>


      <p>Is the session logged in? {isLoggedIn.toString()}</p>
      {isLoggedIn && <p>If yes, this is the session webID {webId}</p>}

      <p> This is the list of movies you made in MovieKraken:</p>

      <ul>
        {movieList && movieList.map((item, index) => (
          <li key={index}>
            {typeof item[index] === object ? (
              <p>Name: {item[index].url}</p>
            ) : (
              <p>Invalid URL</p>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default homePage;