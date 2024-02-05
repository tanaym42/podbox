This is a MIMS I School Capstone project based on the SOLID protocol and [Next.js](https://nextjs.org/), bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Notes for Drake:

* For some reason, every react implementation seems to come with a framework now. We'll be using Next.js, which might become more important the further we get into development, but is pretty much like react for the basic stuff. 

* **The Getting Started section should start you off for installation and running.**

* I've been trying to use the React SDK tools that Inrupt maintains. I think this should be the easiest way to implement stuff and it seems like it does away with a lot of complexity for authentication and data fetching -- though I am willing to try other stuff too. The link to the docs is here: https://docs.inrupt.com/developer-tools/javascript/react-sdk/

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
