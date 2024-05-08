// app/auth.js
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'; // Import your authentication library
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser';

const AuthContext = createContext();



export function AuthProvider({ children }) {
  const [loginCheck, setLoginCheck] = useState(false);
  const [authWebID, setAuthWebID] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const session = getDefaultSession();
      if (session) {
        console.log('Session found:', session);
        const isLoggedIn = session.info.isLoggedIn;
        const webID = session.info.webId;
        setLoginCheck(isLoggedIn);

      } else {
        console.log('No session found');
        setLoginCheck(false);
      }
    };

    checkAuthentication();
  }, []); // Run only once on component mount

  // Function to update loginCheck
  const updateLoginCheck = (newState, webIdenitification) => {
    setLoginCheck(newState);
    setAuthWebID(webIdenitification);
  };

  return (
    <AuthContext.Provider value={{ loginCheck, authWebID, updateLoginCheck }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

