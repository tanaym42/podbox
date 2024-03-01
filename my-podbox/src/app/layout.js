// next.js allows us to make a layout.js page which is effectively a template we can use on future pages

// you'll notice there's no direct link to layout.js inside of page.js, apparently react just knows if there's a layout.js at the parent level

// importing CSS from the global css file 
import styles from "./globals.css";
// the topnav component from this file, which was made manually 
import TopNav from './components/header/header.js';

// This is browser metadata, like tab title

// this layout.js page doesn't use client because if we use client it will break the code
//  it is a mystery.

export const metadata = {
  title: "PodBox",
  description: "Your first POD management tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        
        <body className={styles.wrapper}>
          <TopNav />
          {children}
        </body>
      
    </html>
  );
}
