"use client";
import React, { useEffect, useState } from 'react';
// this handles the redirect from the third party oidc provider
import { handleIncomingRedirect, EVENTS, onSessionRestore } from '@inrupt/solid-client-authn-browser';
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getPodUrlAll, getSolidDataset, getStringNoLocale, getThingAll, getUrl } from "@inrupt/solid-client";

import styles from "./page.module.css";

const MyData = () => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [webId, setWebId] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [rootUrl, setRootUrl] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState([]);
    const session = getDefaultSession();
    //console.log(session);
    // pathname = usePathname()

    // 1. Register the callback to restore the user's page after refresh and
    //    redirection from the Solid Identity Provider.
    // session.events.on(EVENTS.SESSION_RESTORED, (url) => {
    //     navigate(url);
    // });

    // Extracts the name of a directory from a given url
    function extractName(url) {
        // Split the URL by '/' and get the last part
        const parts = url.split('/');

        // Check if the last part contains a '/'
        let con_name;
        if (parts[parts.length - 1] == '') {
            con_name = parts[parts.length - 2]
        } else {
            con_name = parts[parts.length - 1]
        }

        //let name =  parts[parts.length - 2]; // Assuming the name is just before the last '/'
        // Capitalize the first letter
        con_name = con_name.charAt(0).toUpperCase() + con_name.slice(1);
    
        // Replace hyphens with spaces
        con_name = con_name.replace(/-/g, ' ');
        return con_name;
    };

    function generateNameUrlMap(urls, mainurl) {
        // Takes in a list of urls and returns a dictionary of 'name' to 'url' for display. 
        const nameUrlMap = {};
        
        urls.forEach(url => {
            if (url !== mainurl) {
                const name = extractName(url);
                nameUrlMap[name] = url;
            }
        });
        
        return nameUrlMap;
    };

    function handlePrevList() {
        // On the click of something, changes the prev url list, so that the back button can work. 


        console.log('This is the root url: ')
        console.log(currentUrl);
    
        // Create a copy of prevUrl array and push currentUrl to it
        const temp_list = prevUrl;
        temp_list.push(currentUrl);
    
        // Update the state with the new array
        setPrevUrl(temp_list);
    
        console.log('This is the previous URL list.')
        console.log(prevUrl);

    }
    
    async function fetchThingList(webId) {
        // Function to fetch the url and containers associated with the logged in WebId. 

        const podUrls = await getPodUrlAll(webId, { fetch: session.fetch });
        const podUrl = podUrls[0]

        const containerList = fetchContainers(podUrl)
        return containerList;
    };
    
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
        });

        
        fetchFileList();

      }, [webId]);

    const fetchFileList = async (  ) => {
        // To run automatically on load, inside the UseEffect

        console.log('If this shows Im basically just resetting every time');    
        if (session.info.isLoggedIn) {
            const files = await fetchThingList(webId);
            setFileList(files);
            setCurrentUrl(null);
        }
    };

    async function fetchContainers (url) {
        // Fetches the containers associated with a particular url


        const myThing = await getSolidDataset(
            url,                              // Here, replace it with my podurl information. 
            { fetch: session.fetch }          // fetch from authenticated session
          );

        const myThingList = await getThingAll (
            myThing, 
            { fetch: session.fetch }
        );
        
        // Create a list of all the containers in a directory
        const thingList = []
        for (const thing of myThingList) {
            // Perform your operation on each thing and store the result in the new list
            const operationResult = thing.url;
            thingList.push(operationResult);
        }
        
        // Extract the names, return as a dictionary of name and url or the link
        const nameUrlDict = generateNameUrlMap(thingList, url);
        return nameUrlDict;
    }

    async function handleItemClick (url) {
        // Extract the names, return as a dictionary of name and url or the link
        console.log('This is the URL being entered.')
        console.log(url)
        const nameUrlDict = await fetchContainers(url);
        setFileList(nameUrlDict);
        setCurrentUrl(url);

        
        return null;
    };

    async function handleBackClick () {
        // Extract the names, return as a dictionary of name and url or the link
        console.log('This is the current state of ')
        console.log('This is the URL being entered.')
        console.log(prevUrl[-1])
        const nameUrlDict = await fetchContainers(prevUrl[-1]);
        setFileList(nameUrlDict);
        setCurrentUrl(url);
        
        return null;
    };

    return (
        <div>
        <h2 onClick ={() => fetchFileList()}>Your data</h2>

        {currentUrl && (
                <p>&gt; {extractName(currentUrl)}</p>
            )}

        {/* <p onClick ={() => handleBackClick()}>BACK BUTTON</p>
        <p>Current </p> */}

        {Object.keys(fileList).length > 0 ? (
                
                <ul>
                    
                    {Object.entries(fileList).map(([key, value]) => (
                        <li key={key} onClick={() => handleItemClick(value)}>
                            <strong>{key}</strong>:
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MyData;