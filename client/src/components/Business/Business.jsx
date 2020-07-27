import React, { useState, useEffect, useContext, useRef } from "react";
import "./Business.scss";
import axios from "axios";
import { LoginContext } from "../../context/LoginState";

export const Business = (props) => {
  const [favourites, setFavourites] = useState([]);
  const { isLoggedIn, email } = useContext(LoginContext);
  const [userCreated, setUserStatus] = useState(false);

  const isInitialMount = useRef(true);

  useEffect(() => {
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

  const handleFavourite = async (business) => {
    const res = await axios.post("/favourites", { email: email });
    let curr;
    try {
      curr = res.data.favouritesId[0].favourites;
      setUserStatus(true);

      // Gets the users favourites in db and updates favourites state
      // setFavourites((prevState) => curr);

      // Checking if business is already stored in users favourites
      for (let i = 0; i < curr.length; i++) {
        if (business === curr[i]) {
          return;
        }
      }

      setFavourites(() => [business, ...curr]);
    } catch (err) {
      setUserStatus(false);
      console.log("New user");
      setFavourites(() => [business]);
    }

    // Checks if user is already stored in db, if so, then update current users favourites field
    // curr.length === 0 ? setUserStatus(false) : setUserStatus(true)
  };

  const StarButton = (props) => {
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
        <div className="Business">
          <div className="image-container">
            <img src={business.imageSrc} alt="" />
          </div>
          <div className="title-favourite">
            <h2>{business.name}</h2>
            {isLoggedIn ? <StarButton business={business.id} /> : null}
          </div>
          <div className="Business-information">
            <div className="Business-address">
              <p>{business.address}</p>
              <p>{business.city}</p>
              <p>{business.zipCode}</p>
              {/* <p>{business.id}</p> */}
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
