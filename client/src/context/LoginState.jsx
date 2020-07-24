import React, { useState } from "react";
import { createContext } from "react";


// Context
export const LoginContext = createContext();

// Provider Component
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLogIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const addProfileData = (name, email, imageUrl) => {
    setName(name);
    setEmail(email);
    setImageUrl(imageUrl);
  }

  // Two functions here: logging in and logging out
  // In these functions i will use axios to access googles oAuth API using PassportJS
  // Need to figure out where useEffect function will go to check if user is already logged in, probably in this file

  return(
      <LoginContext.Provider value={{
          isLoggedIn,
          setLogIn,
          name,
          email,
          imageUrl,
          addProfileData
      }}>
          {children}
      </LoginContext.Provider>
  );
};
