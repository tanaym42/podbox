import { Inter } from "next/font/google";
import styles from "./globals.css";
import TopNav from './components/header/header.js';

const inter = Inter({ subsets: ["latin"] });

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
