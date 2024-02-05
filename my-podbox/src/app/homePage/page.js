// src/SecondPage.js
"use client";
import React, { useEffect } from 'react';
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { getSolidDataset, saveSolidDatasetAt } from "@inrupt/solid-client";


import { useState } from "react";

const homePage = () => {
  const completeLogin = async () => {
    await handleIncomingRedirect();
    console.log("Check complete");
  };

    // Function to fetch the Solid dataset
  const fetchSolidDataset = async () => {
    try {
      const myDataset = await getSolidDataset(
        "https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/contacts/",
        { fetch: fetch }
      );
      console.log(myDataset);
    } catch (error) {
      console.error("Error fetching Solid dataset:", error);
    }
  };

  // useEffect hook to run completeLogin on component mount
  useEffect(() => {
    completeLogin();
    fetchSolidDataset();
  }, []); // The empty dependency array ensures it runs once on mount

  

  return (
    <div>
      <h1>This is the Home Page dummy</h1>

      <h1>Demo - this is the page</h1>
      
      {/* {session.info.isLoggedIn} */}
      {/* <h1> This is the user ID: {webId}</h1> */}

      {/* <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
      <Text propertyUrl="http://www.w3.org/2006/vcard/ns#fn" />
      </CombinedDataProvider> */}

    </div>
  );
};

export default homePage;