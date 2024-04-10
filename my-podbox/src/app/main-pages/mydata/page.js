"use client";
import React, { useEffect, useState } from 'react';
// this handles the redirect from the third party oidc provider
import { handleIncomingRedirect, onSessionRestore } from '@inrupt/solid-client-authn-browser';
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getPodUrlAll, getSolidDataset } from "@inrupt/solid-client";


import styles from "./page.module.css";

const myData = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [webId, setWebId] = useState(null);

    const session = getDefaultSession();
    // const mypods = await getPodUrlAll(webId, { fetch: fetch });
    // console.log(mypods);

    async function fetchThingList(webId) {
        const podUrl = await getPodUrlAll(webId, { fetch: fetch });
        console.log(podUrl[0])
        const myThingList = await getSolidDataset(
            podUrl[0],                     // Here, replace it with my podurl information. 
            { fetch: fetch }          // fetch from authenticated session
          );
        console.log(myThingList);
    }

    
    useEffect(() => {
        //    When loading the component, call `handleIncomingRedirect` to authenticate
        //    the user if appropriate, or to restore a previous session.
        handleIncomingRedirect({
            restorePreviousSession: true,
        }).then((info) => {
            console.log(`Logged in with WebID [${info.webId}]`);
            // console.log(session)
            // Sets the state of webId and setIsLoggedIn for further use. 
            setIsLoggedIn(true);
            setWebId(info.webId);
            webId && fetchThingList(webId);
        });
      }, [webId]);

    return (
        <h2>Your data</h2>
    );
}

export default myData;