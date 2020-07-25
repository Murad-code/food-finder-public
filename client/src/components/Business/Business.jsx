import React, { useState, useEffect, useContext } from "react";
import "./Business.scss";
import axios from "axios";
import { LoginContext } from "../../context/LoginState";

export const Business = (props) => {
  const [favourites, setFavourites] = useState([]);
  const { isLoggedIn, email } = useContext(LoginContext);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    console.log("favourites: " + favourites);
    axios.post('/favourites/add', { email: email, favourites: favourites })
  }, [favourites])

  const handleFavourite = async (business) => {
    // Get request to check if user is stored in database
    const getResult = await axios.post("/favourites", { email: email });
    console.log(getResult.data.favouritesId);

    // This section is testing if favourites and business values match
    setFavourites((prevState) => [business, ...prevState]);

    console.log("business: " + business);
    // console.log("favourites: " + favourites);

    if (business !== "") {
      console.log("in if statement");
    }

    // This one is for testing, the actual post is inside the if/else
   

    // if(getResult.data.favouritesId.length === 0) {
    //   // When user's email isnt stored in db, create a record for that email
    //   console.log('in if statement')
    //   await axios.post('/favourites/add', { email: email, favourites: favourites })
    // } else {
    //   // When user has email in db, update the favourites field
    //   console.log('in else statement')
    //   await axios.put('/favourites/update', { email: email, favourites: favourites })
    // }
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
