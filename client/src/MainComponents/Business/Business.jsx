import React, { useState, useEffect, useContext, useRef } from "react";

import { store } from "react-notifications-component";
import "animate.css";
import "react-notifications-component/dist/theme.css";

import "./Business.scss";
import axios from "axios";
import { LoginContext } from "../../context/LoginState";

export const Business = (props) => {
  const [favourites, setFavourites] = useState([]);
  const { isLoggedIn, email } = useContext(LoginContext);
  const [userCreated, setUserStatus] = useState(false);

  const isInitialMount = useRef(true);

  useEffect(() => {
    // This if statement stops useEffect running sendData on initialisation
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const sendData = async () => {
        if (!userCreated) {
          // When user's email isnt stored in db, create a record for that email
          console.log("in if statement");
          await axios.post("/favourites/add", {
            email: email,
            favourites: favourites,
          });
        } else {
          // When user has email in db, update the favourites field
          console.log("in else statement");
          await axios.put("/favourites/update", {
            email: email,
            favourites: favourites,
          });
        }
      };
      sendData();
    }
  }, [favourites]);

  const StarButton = (props) => {
    const handleFavourite = async (business) => {
      console.log("in handleFavourite");
      const res = await axios.post("/favourites", { email: email });
      let curr;
      try {
        curr = res.data.favouritesId[0].favourites;
        setUserStatus(true);

        // Checking if business is already stored in users favourites
        for (let i = 0; i < curr.length; i++) {
          if (business.id === curr[i].id) {
            store.addNotification({
              title: "Can't save!",
              message: "This is already in your favourites",
              type: "danger",
              insert: "top",
              container: "bottom-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: false,
              },
            });
            return;
          }
        }

        setFavourites(() => [business, ...curr]);
      } catch (err) {
        setUserStatus(false);
        console.log("New user");
        setFavourites(() => [business]);
      }
      store.addNotification({
        title: "Saved!",
        message: "Added to your favourites",
        type: "success",
        insert: "top",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: false,
        },
      });
    };
    return (
      <div
        className="star-icon"
        onClick={() => handleFavourite(props.business)}
      >
        <span className="material-icons">star_rate</span>
      </div>
    );
  };

  const BusinessComponent = () => {
    return props.business.map((business) => {
      return (
        <div className="Business animated fadeIn">
          <div className="image-container">
            <img src={business.imageSrc} alt="" />
          </div>
          <div className="title-favourite">
            <h2>{business.name}</h2>
            {isLoggedIn ? <StarButton business={business} /> : null}
          </div>
          <div className="Business-information">
            <div className="Business-address">
              <p>{business.address}</p>
              <p>{business.city}</p>
              <p>{business.zipCode}</p>
            </div>
            <div className="Business-reviews">
              <h3>{business.category}</h3>
              <h3 className="rating">{business.rating}</h3>
              <p>{business.reviewCount}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div id="Business" className="BusinessList">
      <BusinessComponent />
    </div>
  );
};
