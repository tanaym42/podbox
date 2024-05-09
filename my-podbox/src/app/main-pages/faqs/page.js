// src/SecondPage.js


"use client";
import React, {useRef} from 'react';
import styles from "./page.module.css";


// things I need from pod input; app name, app image, last modified, date created, link to app, link to app controls, link to view related data 

// I'll need to load the page and return all the data (with a delay), then add each piece of data into an json array, and then add elements to the document for each json item 

function FAQItem({ question, answer }) {
  const answerRef = useRef(null);

  const toggleAnswer = () => {
    if (answerRef.current.style.display === 'block') {
      answerRef.current.style.display = 'none';
    } else {
      answerRef.current.style.display = 'block';
    }
  };

  return (
    <div className={styles.faqItem}>
      <div className={styles.faqQuestion} onClick={toggleAnswer}>
        {question}
      </div>
      <div className={styles.faqAnswer} ref={answerRef}>
        {answer}
      </div>
    </div>
  );
}



const faq = () => {
// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
      <h1>Frequently Asked Questions</h1>
      <h2>PodBox Features</h2>
      <div className={styles.faqContainer}>
        <FAQItem
          question="What is PodBox?"
          answer="PodBox is a personal data management tool for a decentralized web. It is an interface that lets you view and access all the resources stored in your Pod. It is like Google Dashboard but more."
        />
        <FAQItem
          question="Can I download PodBox on PlayStore or AppStore?"
          answer="No, Solid applications like PodBox are not on PlayStore or AppStore. You can try PodBox here."
        />
        <FAQItem
          question="Where can I see other Solid applications?"
          answer="They can be found here."
        />
        <FAQItem
          question="Do I store all my data in PodBox?"
          answer="You store your data in a POD, like your personal server. PodBox helps you access, organize and manage your data which resides in a POD."
        />
        <FAQItem
          question="Can I download my data to my local computer?"
          answer="Yes, you can. PodBox gives you an option to download your data. Check out My Apps page on PodBox."
        />
        <FAQItem
          question="I’m new to Solid Ecosystem, where do I get started?"
          answer="You can get started by creating a POD. Once you create a POD, check out some of the Solid applications. "
        />

        <h2>Personal Data</h2>

        <FAQItem
          question="What is personal data?"
          answer="Personal data is information about you—like your name, where you live, or what you buy—that can be used to figure out who you are. It's important to keep it safe because it's like your digital footprint, and people should only use it responsibly and with your permission."
        />
        <FAQItem
          question="What is interoperability?"
          answer="Interoperability is when you can seamlessly switch between different apps and services without losing your data. With Solid, you can switch from one social media platform to another while carrying your posts, followers, likes, etc. "
        />

        <h2>SOLID</h2>
        <FAQItem
          question="What is SOLID?"
          answer="Solid, derived from “Socially Linked Data”, is a set of protocols and tools aimed at constructing decentralized social platforms.  At its core, Solid enables individuals and communities to securely store their data in containers known as Personal Online Datastores (PODs). With PODs, users have full control over the access permissions granted to both individuals and applications seeking to interact with their data.  Read More about Solid here. 
          
          It is a specification PodBox is built on."
        />
        <FAQItem
          question="What are Solid Applications?"
          answer="Solid Applications are applications built on the Solid protocol, such as PodBox. They access user data through the POD, enabling functions like reading, writing, and appending data."
        />

        <h2> PODs </h2>

        <FAQItem
          question="What is a Pod?"
          answer="POD stands for <strong>P</strong>ersonal <strong>O</strong>nline <strong>D</strong>atastore. A POD is like a web server for your data. You can store all kinds of data on your POD. It is like your personal Google Drive or DropBox."
        />
        <FAQItem
          question="What is a WebID? Where do I find it?"
          answer="WebID is a unique identifier to identify a specific user. It could look like https://id.inrupt.com/your-username.  You can copy your WebID from the ‘Copy WebID’ option at the present at the top-right corner of PodBox."
        />
        <FAQItem
          question="Do I have to pay for my POD?"
          answer="You don’t have to pay for a POD at the moment."
        />
        <FAQItem
          question="Can I use all internet services with Solid?"
          answer="You can use applications that are built on Solid protocol. Check out Solid apps here. "
        />
        <FAQItem
          question="What is a POD Provider?"
          answer="POD providers host your POD. They provide secure and reliable storage for your POD. They are like Amazon for AWS storage, and Google for Google Drive.  You can choose to self-host your POD, in that case, you don’t need to have a POD Provider."
        />
        <FAQItem
          question="Can I give PodBox access to only specific data in my POD?"
          answer="Not yet. Currently, you give access to your whole POD."
        />
        <FAQItem
          question="How do I choose a POD Provider?"
          answer=" "
        />
        <FAQItem
          question="Who has access to my POD?"
          answer="Only you and the applications you give permission to have access to your POD. You can always grant or revoke access, and must allow access every time you log in."
        />

        <h2>Safety and Security</h2>
        <FAQItem
          question="Is my data safe?"
          answer="Your data is safe. It is encrypted when read or written between pods and apps. However, you should be cautious about what apps you are using and read the terms of the service before using any app."
        />
        <FAQItem
          question="What happens if I want to leave PodBox?"
          answer="You can leave PodBox anytime you want. Your data is in the Pod, not with PodBox. PodBox is only a tool to organize your data, but doesn’t save any data from your Pod while managing it."
        />
        <FAQItem
          question="How do I delete all my data?"
          answer="With a hammer."
        />
        {/* Add more FAQ items here */}
      </div>
    </div>
  );
}

export default faq;