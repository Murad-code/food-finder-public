import React, { useState, useContext } from "react";
import "./FavHeader.scss";
// import { ReactComponent as ProfileIcon } from "./ProfileIcon.svg";
import axios from "axios";
import { GoogleLogout } from "react-google-login";
import { LoginContext } from "../../context/LoginState";

export const FavHeader = (props) => {
  const [dropdown, setDropdown] = useState(false);

  const { isLoggedIn, setLogIn, name, email, imageUrl } = useContext(
    LoginContext
  );

  const logout = () => {
    console.log("logged out");
    setLogIn(false);
    setDropdown(!dropdown);
    props.setFavouritesStatus();
  };

  const back = () => {
    props.setFavouritesStatus();
  }
  // const loadFavourites = async () => {
  //   await axios.post("/favourites", { email: email });

  //   // Do stuff here ...
  // };

  const Profile = (props) => {
    return <div className="Fav-Profile">{isLoggedIn && props.children}</div>;
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
          className="ProfileButton"
          onClick={() => setDropdown(!dropdown)}
        />

        {dropdown && props.children}
      </>
    );
  };

  const Dropdown = () => {
    return (
      <ul className="Dropdown">
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
      <div className="Fav-Title">
        <div className="header-1">
          <h4>Food-Finder</h4>
        </div>
        <div className="header-2">
          <h2>Favourites</h2>
        </div>
      </div>
    );
  };

  const BackButton = () => {
    return (
      <div className="Fav-Back" onClick={back}>
        <i className="material-icons md-48 BackBtn">arrow_back</i>
      </div>
    );
  };

  return (
    <header className="main">
      <BackButton />
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
