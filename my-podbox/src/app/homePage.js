// src/SecondPage.js
import React from 'react';
import { useSession } from "@inrupt/solid-ui-react";


const homePage = () => {
  const { session } = useSession();

  return (
    <div>
      <h1>This is the Home Page dummy</h1>

      <h1>Demo</h1>
      
      {session.info.isLoggedIn}

    </div>
  );
};

export default homePage;