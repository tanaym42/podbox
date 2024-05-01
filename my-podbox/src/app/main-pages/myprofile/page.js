"use client";
import React, { useEffect, useState } from 'react';
// this handles the redirect from the third party oidc provider
import { handleIncomingRedirect, EVENTS, onSessionRestore, fetch } from '@inrupt/solid-client-authn-browser';
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser';
// import { getPodUrlAll, getSolidDataset, getStringNoLocale, getThingAll, getUrl } from "@inrupt/solid-client";

import {
    getThing,
    getThingAll,
    getUrlAll,
    getSourceUrl,
    getProfileAll
  } from "@inrupt/solid-client";

import {
  addUrl,
  addStringNoLocale,
  buildThing,
  createSolidDataset,
  createThing,
  setThing,
  saveSolidDatasetAt,
} from "@inrupt/solid-client";

import { SCHEMA_INRUPT, RDF } from "@inrupt/vocab-common-rdf";
  
// import { solid } from "@inrupt/vocab-solid";

import styles from "./page.module.css";

const myProfile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [webId, setWebId] = useState(null);
    const [profileName, setProfileName] = useState('Not assigned yet. Click to edit.')
    const [profileEmail, setProfileEmail] = useState('Not assigned, yet. Click to edit.')
    const [podSpace, setpodSpace] = useState('Not assigned, yet. Click to edit.')
    const [podAppsNum, setPodAppsNum] = useState('Not assigned, yet. Click to edit.')
    const [podContsNum, setContsNum] = useState('Not assigned, yet. Click to edit.')
    const [profileLink, setProfileLink] = useState(null)

    const session = getDefaultSession();

    useEffect(() => {
        //    When loading the component, call `handleIncomingRedirect` to authenticate
        //    the user if appropriate, or to restore a previous session.
        handleIncomingRedirect({
            restorePreviousSession: true,
        }).then((info) => {
            console.log(`Logged in with WebID [${info.webId}]`);

            setIsLoggedIn(true);
            setWebId(info.webId);
        });

      }, [webId]);

      if (webId !== null) {
        getMyProfiles(webId);
      }

    async function getMyProfiles(webId) {
        
        try {
      
          // 2. Get the WebID Profile and the extended profiles listed in the WebID Profile.
          //
          // - For WebID Profile, getProfileAll performs an unauthenticated fetch.
          // - For extended profiles, getProfileAll performs either:
          //   - an unauthenticated fetch of the extended profiles if
          //     the passed in fetch is omitted or fetch is unauthenticated,
          //   - authenticated fetch if the passed in fetch is authenticated.
      
            const profiles = await getProfileAll(
                webId,
                { fetch : session.fetch}
            );
      
          // Step 4. Read from the extended profiles.
          // - Get the array of extended profiles from the returned profiles.
          // - Loop through the extended profiles.
      
            const extendedProfilesSolidDatasets = profiles.altProfileAll;
      
            extendedProfilesSolidDatasets.forEach((extendedProfileSolidDataset) => {
                // console.log('It is trying to fetch the extended profile...')
                // console.log(getSourceUrl(extendedProfileSolidDataset));
                const thingsInExtendedProfile = getThingAll(extendedProfileSolidDataset);
                // console.log('This is where it will print the things in the extended profile.')
                // console.log(thingsInExtendedProfile)
                thingsInExtendedProfile.forEach((thing) => {

                    
                if (thing.url.toString() == webId.toString()) {
                    // console.log('This is the open profile link.');
                } else {
                    console.log('This is the actual extended profile.');
                    console.log(thing.url);
                    // console.log(webId);
                    setProfileLink(thing.url);
                }
                    
                });
            })
      
        } catch (error) {
          console.log('There is some error.')
          console.log(error);
        }
    }
    
    const createSomething = async () => {
        console.log('Entering create something.')
        let courseSolidDataset = createSolidDataset();

        
        const newBookThing1 = buildThing(createThing({ name: "book1" }))
            .addStringNoLocale("https://schema.org/name", "The Stars of Wagabong")
            .addUrl(RDF.type, "https://schema.org/Book")
            .build();
        
        courseSolidDataset = setThing(courseSolidDataset, newBookThing1);
        // courseSolidDataset = setThing(courseSolidDataset, newBookThing2);
        
        const savedSolidDataset = await saveSolidDatasetAt(
            "https://storage.inrupt.com/aee4b109-6b0a-41d3-90d7-1b7aeb21dfa9/random_test",
            courseSolidDataset,
            { fetch: session.fetch }             // fetch from authenticated Session
        );
    }

    // createSomething();
    
    return (
        <div>
            {!webId ? (
            <p>Loading...</p>
            ) : (
          
            <div className={styles.main}>
                {/* Will need to add placeholder and pull in user's name */}
                <h1>Hi Drake! </h1>
                <div>
                    <h1>Account information</h1>
                        <h2>Name: {profileName}</h2> 
                        <h2>WebID: {webId}</h2>
                        <h2>Email: {profileEmail}</h2> 
                </div>

                <div>
                    <h1>Data information</h1>
                        <h2>Space used: {podSpace}</h2> 
                        <h2>Total apps: {podAppsNum}</h2>
                        <h2>Containers: {podContsNum}</h2> 
                </div>                  
          </div>
          
            )}
        </div>
    );
}

export default myProfile;