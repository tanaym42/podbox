// src/SecondPage.js
"use client";
import React, { useEffect, useState } from 'react';
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { getSolidDataset, saveSolidDatasetAt } from "@inrupt/solid-client";

const homePage = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [webId, setWebId] = useState(null);

  useEffect(() => {
  let random = null;  
  const completeLogin = async () => {
    await handleIncomingRedirect();
    console.log("Check complete");

    const session = getDefaultSession();
    random = session;
    console.log(session)
    console.log(session.info)
    
    if (session.info.isLoggedIn) {
      console.log(session.info.webId)

      setIsLoggedIn(true);
      setWebId(session.info.webId);

      // Enable Read button to read Pod URL
      // buttonRead.removeAttribute("disabled");
    }

  };
  

  // useEffect hook to run completeLogin on component mount
  
    completeLogin();
  }, []); // The empty dependency array ensures it runs once on mount

  

  return (
    <div>
      <h1>Welcome to your Pod!</h1>


      <p>Is the session logged in? {isLoggedIn.toString()}</p>
      {isLoggedIn && <p>If yes, this is the session webID {webId}</p>}

    </div>
  );
};

export default homePage;