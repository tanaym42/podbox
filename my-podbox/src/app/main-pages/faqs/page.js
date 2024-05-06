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
    <div className="faqItem">
      <div className="faqQuestion" onClick={toggleAnswer}>
        {question}
      </div>
      <div className="faqAnswer" ref={answerRef}>
        {answer}
      </div>
    </div>
  );
}



const faq = () => {
// html content to show on the page after we've run everything above this 
  return (
    <div className="faqContainer">
      <FAQItem
        question="Question 1: What is Lorem Ipsum?"
        answer="Answer 1: Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      />
      <FAQItem
        question="Question 2: Why do we use it?"
        answer="Answer 2: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
      />
      {/* Add more FAQ items here */}
    </div>
  );
}

export default faq;