## Creating new pages

If you want to create a new page, you need to create a new folder/directory and create two files in that directory; a js file and a file called page.module.css. You then will need to link the page.module.css file inside of the js folder (usually called page.js) so that React knows which file to use for the CSS.

We're pretty sure this file **needs** to be called \<something\>.module.css

This allows us to avoid conflicts with CSS inheritance. If you inspect in a browser, you'll see that Next.JS has assigned a four character code on the end of the class name. This happens in each module, so avoids collissions when multiple components use the same class name (e.g. `main` will be `main_aAvH` in the landing page and `main_xxxx` in another component).

## Login process

1. We hit the login button, which takes us to the components/login/page.js file
2. We then hit "login with inrupt", which then redirects us to third party login site, and begins the startLogin() function in components/login/page.js
   - The site we want to follow is the "oidcprovider" value in that js file
3. Once the third-party has logged in with our credentials, it hands the session back to podbox using the redirectURL parameter of startLogin there
   - This hands us to homePage/page.js, which has a handleIncomingRedirect function that is built into the solid authentication library
4. The third-party website hands us an info file that we then use to get information from the third-party, such as webId
