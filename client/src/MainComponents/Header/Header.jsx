import React, { useState, useContext } from "react";
import "./Header.scss";
// import { ReactComponent as ProfileIcon } from "./ProfileIcon.svg";
import { GoogleLogout } from "react-google-login";
import { LoginContext } from "../../context/LoginState";

export const Header = (props) => {
  const [dropdown, setDropdown] = useState(false);

  const { isLoggedIn, setLogIn, name, imageUrl } = useContext(
    LoginContext
  );

  const logout = () => {
    console.log("logged out");
    setLogIn(false);
    setDropdown(!dropdown);
  };

  const loadFavourites = async () => {
    props.setFavouritesStatus(true);
  };

  const Profile = (props) => {
    return <div className="Profile">{isLoggedIn && props.children}</div>;
  };

  const Name = (props) => {
    return (
      <div className="Name">
        <h4>{name}</h4>
      </div>
    );
  };

  const ProfileButton = (props) => {
    return (
      <>
        <img
          src={imageUrl}
          alt="img"
          className="ProfileButton"
          onClick={() => setDropdown(!dropdown)}
        />

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
      <div id="Span"></div>
      <Title />
      <Profile>
        <Name />
        <ProfileButton>
          <Dropdown />
        </ProfileButton>
      </Profile>
    </header>
  );
};
