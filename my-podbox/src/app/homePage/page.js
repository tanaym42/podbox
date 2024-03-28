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
  const [movieDataUrl, setMovieDataUrl] = useState('https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/movies/inception-2010');
  const [movieList, setMovieList] = useState();
  const [movieNameList, setMovieNameList] = useState();
  const [inputUrl, setInputUrl] = useState('');


  const session = getDefaultSession();

  async function viewResourceACR(inputURL) {

    try {
      // 1. Fetch the SolidDataset with its Access Control Resource (ACR).
      const resourceWithAcr = await acp_ess_2.getSolidDatasetWithAcr(
        inputURL,
        // 'https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/',
        { fetch: fetch }            // fetch from the authenticated session
      );

      console.log(resourceWithAcr);

      const linkedAcrUrl = acp_ess_2.getLinkedAcrUrl(resourceWithAcr);
      console.log("Linked ACR URL:", linkedAcrUrl);
  
      // 2a. Get the Access Control Resource (ACR)
      const myACR = await getSolidDataset(
        linkedAcrUrl,
        { fetch: fetch }
        )
      
      // 2b. Output (formatted as Turtle) its policies and matchers details.
      console.log('MyACR')
      // console.log(solidDatasetAsTurtle(myACR));

      // // 3a. Get all policies from the ACR to process policies.
      const myResourcePolicies = acp_ess_2.getResourcePolicyAll(resourceWithAcr);

      // // Loop through each policy for processing.
      myResourcePolicies.forEach(policy => {
        console.log('Policy:')
        console.log(policy)
      });

      // // 3b. Get a specific policy from the ACR.
      const specificPolicy = acp_ess_2.getResourcePolicy(
          resourceWithAcr,
         "specify-the-name-of-policy-to-get"
       );

      // // 4a. Get all matchers from the ACR to process matchers.
       const myResourceMatchers = acp_ess_2.getResourceMatcherAll(resourceWithAcr)

      // // Loop through each matcher for processing.
      myResourceMatchers.forEach(matcher => {
         console.log('matcher');
         console.log(matcher)
      });

      // // 4b. Get a specific matcher from the ACR.
      // const specificMatcher = acp_ess_2.getResourceMatcher(
      //   resourceWithAcr,
      //   "specify-the-name-of-matcher-to-get"
      // );

      // This will attempt to change my permissions

      console.log("ACL setting begins...")
      const set_acl_resource = "https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/"
      const set_acl_agent = "https://id.inrupt.com/tanaym93" 
      universalAccess.setAgentAccess(
        set_acl_resource,         // Resource
        set_acl_agent,     // Agent
        { read: true, write: true, append: true, controlRead: true, controlWrite: true},          // Access object
        { fetch: fetch }                         // fetch function from authenticated session
      ).then((newAccess) => {
        logAccessInfo(set_acl_agent, newAccess, set_acl_resource)
      });
      
      function logAccessInfo(agent, agentAccess, resource) {
        console.log(`For resource::: ${resource}`);
        if (agentAccess === null) {
          console.log(`Could not load ${agent}'s access details.`);
        } else {
          console.log(`${agent}'s Access:: ${JSON.stringify(agentAccess)}`);
        }
      }

      // This will attempt to actually fetch the ACL associated with the repository

      console.log("This is the ACL:::")
      const myDatasetWithAcl = await getSolidDatasetWithAcl(
        'https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/', 
        {fetch: fetch});
      console.log("This is reaching public access:::")
      const publicAccess = getPublicAccess(myDatasetWithAcl);
      console.log("This is the ACL:::")
      console.log(publicAccess);
      

    } catch (error) {
        console.error(error.message);
    }
  }

  const fethAccessInfo = async (inputUrl) => {

    // Fetch the access for all agents whose access has been explicitly/directly set
    // (i.e., omits access inherited through public membership).
    // The returned access can be an object { read: <boolean>, append: <boolean>, ... } 
    // or null if the access data is inaccessible to the user.
    console.log(inputUrl);
    universalAccess.getAgentAccessAll(
      inputUrl,
      // 'https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/', // resource
      { fetch: fetch }                // fetch function from authenticated session
    ).then((accessByAgent) => {
      // => accessByAgent is an object with Agent WebIDs as keys,
      //    and their associated access object {read: <boolean>, ... } as values.
      console.log("THE AGENT STUFF IS BEING ENTERED")
      console.log(accessByAgent)


      for (const [agent, agentAccess] of Object.entries(accessByAgent)) {
        logAccessInfo(agent, agentAccess);
        console.log("THE AGENT STUFF SHOULD BE UNDER")
        console.log(agent)
        console.log(agentAccess)
      } 
    });
  }

  function logAccessInfo(agent, agentAccess) {
    console.log(`For resource::: 'https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/'`);
    if (agentAccess === null) {
      console.log(`Could not load ${agent}'s access details.`);
    } else {
      console.log(`${agent}'s Access:: ${JSON.stringify(agentAccess)}`);
    }
  }

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
            console.log(`Logged in with WebID [${info.webId}]`)
            console.log("I reach here.")  
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

  const handleButtonClick = async () => {
    try {
      const response = await fetchUrlData(inputUrl);
      const another_response = await fethAccessInfo(inputUrl);
      await viewResourceACR(inputUrl);
      // Do something with the response if needed
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

// html content to show on the page after we've run everything above this 
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