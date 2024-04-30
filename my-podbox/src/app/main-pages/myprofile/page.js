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

    getMyProfiles(webId);

    async function getMyProfiles(webId) {
        console.log('I am entering the getprofile function.')
        try {
      
          // 1. Get WebID of the logged in user.
          // The example assumes the user is logged in.
          // As such, getDefaultSession().info.webId is NOT null and
          // fetch (associated with the default Session) is an authenticated fetch.
      
          //  const webId = getDefaultSession().info.webId;
      
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
      
          // Step 3. Read from the WebID profile.
          // - Get the WebID profile from the returned profiles.
          // - Read the WebID Profile as a Thing.
          // - Read the OpenID Provider(s) listed in the WebID Profile.
            const webIDProfileSolidDataset = profiles.webIdProfile;
            const webIdThing = getThing(webIDProfileSolidDataset, webId);
            //const issuers = getUrlAll(webIdThing, solid.oidcIssuer);
            
            console.log('This is the webID profile dataset:')
            console.log(webIDProfileSolidDataset);

            console.log('These are the things inside the dataset:')
            console.log(webIdThing);

            //console.log('This returns the issuers of information:')
            //console.log(issuers);
      
          // ...
      
          // Step 4. Read from the extended profiles.
          // - Get the array of extended profiles from the returned profiles.
          // - Loop through the extended profiles.
      
            const extendedProfilesSolidDatasets = profiles.altProfileAll;
      
            extendedProfilesSolidDatasets.forEach((extendedProfileSolidDataset) => {
                console.log('It is trying to fetch the extended profile...')
                console.log(getSourceUrl(extendedProfileSolidDataset));
                const thingsInExtendedProfile = getThingAll(extendedProfileSolidDataset);
                thingsInExtendedProfile.forEach((thing) => {
                    console.log(thing);
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

    createSomething();
    
    return (
        <div>
            {!webId ? (
            <p>Loading...</p>
            ) : (
          
            <div className={styles.main}>
                {/* Will need to add placeholder and pull in user's name */}
                <h1>{webId}</h1>            
          </div>
          
            )}
        </div>
    );
}

export default myProfile;