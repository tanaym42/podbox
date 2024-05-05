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
    getProfileAll,
    getStringNoLocale
  } from "@inrupt/solid-client";

import {
  addUrl,
  addStringNoLocale,
  buildThing,
  createSolidDataset,
  createThing,
  setStringNoLocale,
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
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState('');

    const session = getDefaultSession();

    const handleEditName = () => {
        setIsEditingName(true);
        setNewName(profileName); // Set current name as default in the input field
    };

    const handleSaveName = () => {
        // Perform save action here, e.g., send to server
        // For demonstration, let's just log the new name
        console.log('New name:', newName);
        
        updateName(newName);
        setProfileName(newName);
        setIsEditingName(false);
    };

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
                console.log('Is this finally working?')
                console.log(thingsInExtendedProfile[0]);
                // console.log('This is where it will print the things in the extended profile.')
                // console.log(thingsInExtendedProfile[0].url)
                let temp_test = getStringNoLocale(thingsInExtendedProfile[0], "https://schema.org/name")
                console.log(temp_test);
                setProfileName(temp_test);
                setProfileLink(thingsInExtendedProfile[0].url)
            });
      
        } catch (error) {
          console.log('There is some error.')
          console.log(error);
        }
    }
    
    const updateName = async (nameString) => {
        // Adds a name to the extended profile

        console.log('Entering the update function')

            try {

                    // 1. Get WebID of the logged in user.
                    // The example assumes the user is logged in.
                    // As such, getDefaultSession().info.webId is NOT null and
                    // fetch (associated with the default Session) is an authenticated fetch.

            const webId = getDefaultSession().info.webId;

            // 2. Get the WebID Profile and the extended profiles listed in the WebID Profile.
            //
            // - For WebID Profile, getProfileAll performs an unauthenticated fetch.
            // - For extended profiles, getProfileAll performs either:
            //   - an unauthenticated fetch of the extended profiles if
            //     the passed in fetch is omitted or fetch is unauthenticated,
            //   - authenticated fetch if the passed in fetch is authenticated.

            const profiles = await getProfileAll(webId, { fetch });

            // Step 3. Write to the extended profile.
            // The example assumes only 1 extended profile.
            // a. Get the extended profile.
            // b. Get the user data Thing (identified by the user's WebID) contained in the extended profile.
            // c. Set a Property to this user data.
            // d. Update the myExtendedProfile with the new Property
            // e. Save the updated extended profile

            let myExtendedProfile = profiles.altProfileAll[0];
            console.log('This is the id thingy?')
            let extendedProfileLink = myExtendedProfile.internal_resourceInfo.sourceIri

            let userDataThing = getThing(myExtendedProfile, extendedProfileLink);

            console.log('This is the original user data thing')
            console.log(userDataThing);

            userDataThing = setStringNoLocale(
            userDataThing,
            "https://schema.org/name",
            nameString
            );

            
            console.log('Below should be after update.')
            console.log(userDataThing);

            myExtendedProfile = setThing(
            myExtendedProfile,
            userDataThing
            );
            
            console.log('This is the thing that is being set.')
            console.log(myExtendedProfile);

            await saveSolidDatasetAt(
            getSourceUrl(myExtendedProfile),
            myExtendedProfile,
            { fetch: session.fetch }             // fetch from authenticated Session
            );

            } catch (error) {
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
                    <h2>
                            Name:{' '}
                            {isEditingName ? (
                                <>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                    <button onClick={handleSaveName}>Save</button>
                                </>
                            ) : (
                                <>
                                    {profileName}
                                    <button onClick={handleEditName}>Edit</button>
                                </>
                            )}
                        </h2>
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