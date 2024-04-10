This is a MIMS I School Capstone project based on the SOLID protocol and [Next.js](https://nextjs.org/), bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Notes for Drake:

* For some reason, every react implementation seems to come with a framework now. We'll be using Next.js, which might become more important the further we get into development, but is pretty much like react for the basic stuff. 

* **The Getting Started section should start you off for installation and running.**

* (Feb 4 update) ~~I've been trying to use the React SDK tools that Inrupt maintains. I think this should be the easiest way to implement stuff and it seems like it does away with a lot of complexity for authentication and data fetching -- though I am willing to try other stuff too. The link to the docs is here: https://docs.inrupt.com/developer-tools/javascript/react-sdk/~~ **Gave this up on February 4th due to login issues**

* (Feb 6 update) The React SDK tools was quite annoying and I believe support is very poor. Was not able to implement the login function correctly since I was getting an undefined response from the website. I suggest that we switch to just using the basic libraries. I'm trying to use this link now (https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/authenticate-browser/). It is able to redirect to the Inrupt login page and seems to be able to login as well, but I am not able to fetch data (ERR 401). ~~Needs to be addressed. Currently trying to resolve, as of February 4th~~ Resolved on February 6th. 

* (Feb 7 update) Okay, the session now logs-in and is able to get the webId now. ~~There is a problem with persistence that needs to be resolved. It only logs-in right after I go through the redirect login process.If I referesh, it logs out again.~~ Apart from this, need to now try to fetch data again and see if issue of non-authorization is resolved. **The login persistence issue is resolved on 7th February. It basically needs an additional parameter in handleRedirect to be set to true.** Solved using this link: https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/restore-session-browser-refresh/

* Spent some time in trying to figure out the getpodurls function, but now it works in the latest push on February 8th. 

* (Feb 8 update) **Will focus now on fetching and writing additional data into the pod.** The reading is done, to a certain extent. This link has been useful: https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data/#, though I've sort of freestyled the code for now. I am able to read the movie list from a list I made in Media Kraken, though I am unable to render this into HTML. Cannot tell whether this is an issue of React states or for SOLID. **~~Now trying to figure out how to render information read from pod. To look into writing data next, as of Feb 8th.~~**

* (Feb 18 update) We have now achieved the reading and RENDERING of data that was inputted from Media Kraken on our Pod manager! That was a task and a half. I had to learn about how each folder in the pod is essentially a 'container', which also functions as a solid dataset. From the container 'movies', which is where Media Kraken creates the data, we retrieve all the urls of the movies (or 'Things') in the container by accessing the keys of the dictionary returned by the 'graph.default' of the container solid dataset. From each url, which represents a 'thing', I retrieved the 'name' property as a string using the 'StringNoLocale' function and telling the code which schema type I would like to use. In this case, it is 'scheme.org/name', which is a common vocabulary used to define the 'name' of a specific thing. In this case, it is the name of the movie. Note that I had to look at the dataset to realise that its url would be '{url}#it'. I am not sure if this is a common manner of storage or just what Neil decided to go with. **As of 18th February, have successfully implemented the rendering of a specific property of a thing stored in the pod. Need to do write next. Currently hopeful.**

* The ability to read information will be useful on multiple levels, but I am concerned that each data type from each source will  need its own code for the reading. At this stage, all I want to be able to do is to create some representation of all the files in each container, in which case I think name is actually a great place to start. 

* (Feb 25 update) Introduced styles and routes on the basis of the basic wireframes on figma, which took more doing than I thought. I've currently given each page.js its own 'page.module.css' for styles. There is some duplication here which I am sure should be resolvable. In home page, the page now also waits for the user to input the link of the movies folder to render out the movies that have been seen. **The natural next step would be to try to figure out how to render the different folders and subfolder names in some graphical format, perhaps as in the current wireframes. Should also be able to spin up a 'profile page' fairly quickly. The write stuff is on hold for now, I might skip ahead to figuring out the access management page since I expect some issues there.**

* (March 3rd update) I've tried to introduce access policy functions into the home page. While I am able to access the policies related to my agents, I am yet to figure out how to list all the agents that have access to a particular resources, let alone changing the accesses. I'm implementing most of it, and I believe the answer is in the ACR file that I am able to access, but the agents are stored as keys and the request to view these returns a pending promise. 
I need to do some more debugging here and **will be working on it through the week**. --> This issue was partially resolved. Agents are simply other webIDs that may have access to a user's POD. We also need to be able to specify accesses through 'origin', using some acl origin stuff. 

* (March 27 update) I have given myself controlread and controlwrite access, but am still seemingly unable to access the ACL file. I should not be receiving this error if it exists so I am confused. The fact that am receiving a null value means that it is an authorization issue. I will try moving it out of the code here, but am increasingly begining to feel like we will need to implement some work around in terms of functionality to be able to implement what has been designed. The next step would be to try to understand whether the ACL modification is persistent. This is complicated further by being unable to access my inrupt hosted POD through SOLID OS and adding it to a "trusted app". **Currently beyond fucking frustrated by the inability to write this functionality. We go again tomorrow.**

* (April 9th update) Have reconfigured how the files are structured to make it easier for Drake and make the organization a little cleaner. I am currently just trying to implement the 'my data' page, but am running into some issues with authorization. Keeping the session maintained while switching pages was cumbersome, and there are still some issues with it reloading to the home page, but this should be quickly resolved. Currently also dealing with some authorization issues, which I shall try to get into by tomorrow. 

## Getting Started

1. To run the file, clone the git repository locally and set to the directory. 

2. Then, run the following command to install the react (Next.js) dependencies. 

```bash
npm install next@latest react@latest react-dom@latest
```
3. Make sure you have Node.js version >= v18.17.0 installed. Simply download and install from here: https://nodejs.org/en

4. Start the app by running the following command:

```bash
npm run dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.


## Some next steps

* Figure out how to come back to another page, which lists profile information that is currently available in the POD. So, fetch new data whle loading the page that comes from the landing page. 

* Figure out navigation bar and the main options that will be available to the user - profile, data, apps, access management, settings -- and make the navigation bar. 


## Older notes

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
