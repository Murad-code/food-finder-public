import React, { useState, useContext } from "react";
import "./Header.scss";
// import { ReactComponent as ProfileIcon } from "./ProfileIcon.svg";
import axios from 'axios';
import { GoogleLogout } from "react-google-login";
import { LoginContext } from '../../context/LoginState';

export const Header = () => {
  const [dropdown, setDropdown] = useState(false);

  const {isLoggedIn, setLogIn, name, email, imageUrl} = useContext(LoginContext);

  const logout = () => {
    console.log("logged out");
    setLogIn(false);
    setDropdown(!dropdown);
  };

  const loadFavourites = async () => {
    await axios.post('/favourites', { email: email });

    // Do stuff here ...
  }

  const Profile = (props) => {
    return <>{isLoggedIn && props.children}</>;
  };

  const ProfileButton = (props) => {
    return (
      <>
        <div
          // icon={<ProfileIcon />}
          id="Profile"
          onClick={() => setDropdown(!dropdown)}
        ></div>

        {dropdown && props.children}
        
      </>
    );
  };

  const Dropdown = () => {
    return (
      <ul id="Dropdown">
        <li onClick={loadFavourites}>
          <a href="#">Favourites</a>
        </li>
        <span></span>
          <GoogleLogout
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            render={(renderProps) => (
              <li onClick={renderProps.onClick}>Logout</li>
            )}
            onLogoutSuccess={logout}
          ></GoogleLogout>
      </ul>
    );
  };

  const Title = () => {
    return (
      <div id="Title">
        <h1>Food-Finder</h1>
      </div>
    );
  };

  return (
    <header id="main">
      <Profile>
        <ProfileButton>
          <Dropdown />
        </ProfileButton>
      </Profile>
      <Title />
      <div id="Span"></div>
    </header>
  );
};
