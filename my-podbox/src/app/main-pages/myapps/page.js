// src/SecondPage.js
"use client";
import React, { useEffect, useState } from 'react';
// this handles the redirect from the third party oidc provider
import { handleIncomingRedirect, EVENTS, onSessionRestore } from '@inrupt/solid-client-authn-browser';
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getPodUrlAll, getSolidDataset, createThing, createSolidDataset, saveSolidDatasetAt, addInteger, addStringNoLocale, addUrl, getStringNoLocale, setThing, getThingAll, getUrl } from "@inrupt/solid-client";
import { universalAccess } from "@inrupt/solid-client";

import styles from "./page.module.css";
import jsonData from './csvjson.json';

// things I need from pod input; app name, app image, last modified, date created, link to app, link to app controls, link to view related data 
function Card({ item }) {
  return (
      <div className={styles.card}>
          <div className={styles.imagecontainer}>
              <img className={styles.imageThumbnail} src={item.thumbnailUrl} alt="Item Image"  />
          </div>
          <div className={styles.content}>
              <h2 className={styles.title}>{item.Name}</h2>
              <div className={styles.info}>
                  <p>Last modified: {item.lastModified}</p>
                  <p>Visit website: {item.website}</p>
              </div>
              <div className={styles.buttons}>
                  <button className={styles.button}>Access controls</button>
                  <button className={styles.button}>View related data</button>
              </div>
          </div>
      </div>
  );
}


// I'll need to load the page and return all the data (with a delay), then add each piece of data into an json array, and then add elements to the document for each json item 

const myApps = () => {
  // Automatic login, ability to initialize the apps page, render the apps in my apps
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [webId, setWebId] = useState(null);
  const [fileList, setFileList] = useState([]);
  const session = getDefaultSession();

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

  async function fetchThingList(webId) {
    // Function to fetch the url and containers associated with the logged in WebId. 

    const podUrls = await getPodUrlAll(webId, { fetch: session.fetch });
    const podUrl = podUrls[0]

    const containerList = fetchContainers(podUrl)
    return containerList;
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


  useEffect(() => {
        //    When loading the component, call `handleIncomingRedirect` to authenticate
        //    the user if appropriate, or to restore a previous session.
        handleIncomingRedirect({
            restorePreviousSession: true,
        }).then((info) => {
            console.log(`Logged in with WebID [${info.webId}]`);
            
            // Sets the state of webId and setIsLoggedIn for further use. 
            setIsLoggedIn(true);
            setWebId(info.webId);
        });


      }, [webId]);

  const fetchFileList = async (  ) => {
      // To run automatically on load, inside the UseEffect

      // console.log('If this shows Im basically just resetting every time');    
      if (session.info.isLoggedIn) {
          const files = await fetchThingList(webId);
          console.log("this is being returned by fetchfilelist:")
          console.log(files)
          return files
      }
      
  };

  async function handleInitialization () {

    // Checks if the 'MyApps' SD exists. If not, it will create the list in RDF on the basis of the JSON that was already available. 

    // Fetch the list of files in the main page 
    let rootFileDict = await fetchFileList(webId);
    const rootFileList = Object.keys(rootFileDict);

    // Check if rootFileList contains the 'MyAppList' SolidDataSet. If not, it will create the SD and start populating with things that are in the Json. 
    if (rootFileList.includes('MyApp_Catalogue')) {

    } else {
      // Creates the soliddataset
      let appSolidDataset = createSolidDataset();

      // Creates a new thing to put into the solid dataset
      let newAppThing = createThing({ name: "App_1" });
      newAppThing = addStringNoLocale(newAppThing, 'https://schema.org/name', "Application_1");
      newAppThing = addUrl(newAppThing, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', "https://schema.org/CreativeWork");
      
      // Loop through each JSON entry
      jsonData.forEach((jsonObject, index) => {
          // Creating a new thing for each entry
          let newAppThing = createThing({ name: "App_" + (index + 1) });
          newAppThing = addUrl(newAppThing, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', "https://schema.org/CreativeWork");
            
          for (let key in jsonObject) {
            switch (key) {
                case "Name":
                    newAppThing = addStringNoLocale(newAppThing, 'https://schema.org/name', jsonObject[key]);
                    break;
                case "Creator":
                    newAppThing = addStringNoLocale(newAppThing, 'https://schema.org/creator', jsonObject[key]);
                    break;
                case "Year":
                    newAppThing = addInteger(newAppThing, 'https://schema.org/copyrightYear', parseInt(jsonObject[key].toString()));
                    break;
                case "Short Description":
                    newAppThing = addStringNoLocale(newAppThing, 'https://schema.org/abstract', jsonObject[key]);
                    break;
                case "Long Description":
                    newAppThing = addStringNoLocale(newAppThing, 'https://schema.org/description', jsonObject[key]);
                    break;
                case "URL":
                    if (Array.isArray(jsonObject[key]) && jsonObject[key].length === 0) {
                      // Handle empty array for URL, for example:
                      console.log("URL is an empty array");
                    } else {
                      // Pass the URL to the addUrl function
                      newAppThing = addUrl(newAppThing, 'https://schema.org/url', jsonObject[key]);
                    }
                    break;
                case "Category":
                    newAppThing = addStringNoLocale(newAppThing, 'https://schema.org/applicationCategory', jsonObject[key]);
                    break;
                case "Logo":
                    if (Array.isArray(jsonObject[key]) && jsonObject[key].length === 0) {
                      // Handle empty array for URL, for example:
                      console.log("URL is an empty array");
                    } else {
                      // Pass the URL to the addUrl function
                      newAppThing = addUrl(newAppThing, 'https://schema.org/thumbnailUrl', jsonObject[key]);
                    }
                    break;

                default:
                    // Handle other properties if needed
                    break;
            }
          }
          // Insert the new thing into the dataset that we had previously created
          appSolidDataset = setThing(appSolidDataset, newAppThing);

      });

      // Save the SolidDataset at the specified URL.
      // The function returns a SolidDataset that reflects your sent data
      const podUrls = await getPodUrlAll(webId, { fetch: session.fetch });
      let resourceUrl = podUrls[0]

      resourceUrl += 'MyApp_Catalogue';

      const savedSolidDataset = await saveSolidDatasetAt(
        resourceUrl,
        appSolidDataset,
        { fetch: session.fetch }             // fetch from authenticated Session
      );

      console.log(savedSolidDataset);

      universalAccess.setPublicAccess(
        resourceUrl,  // Resource
        { read: true },    // Access object
        { fetch: session.fetch }                 // fetch function from authenticated session
      ).then((newAccess) => {
        if (newAccess === null) {
          console.log("Could not load access details for this Resource.");
        } else {
          console.log("Returned Public Access:: ", JSON.stringify(newAccess));
      
        }
      });

    }

    // console.log('Dont do anything');

    }

  return (
    <div className={styles.main}>
        {/* Check if webId is null */}
          <div>
              {/* Will need to add placeholder and pull in user's name */}
              <h1>My Apps</h1>

              <button onClick ={() => handleInitialization()}>Initialize Apps List</button>

                <div className={styles.gridContainer}>
                {jsonData.map((item, index) => (
                  <Card key={index} item={item} />
                ))}
                </div>
          </div>
    </div>
  );
};

export default myApps;