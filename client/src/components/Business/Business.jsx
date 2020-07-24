import React, { useState, useEffect, useContext } from "react";
import "./Business.scss";
import axios from 'axios';
import { LoginContext } from '../../context/LoginState';

export const Business = (props) => {
  const [favourites, setFavourites] = useState([])
  const { isLoggedIn, email } = useContext(LoginContext);

  const handleFavourite = async (favourites) => {
    // Add logic to check if id already exists if not then do setFavourites
    

    
    setFavourites(prevState => [favourites, ...prevState])
    await axios.post('/favourites/add', { favourites: favourites, email: email });
  }
  
  const StarButton = (favourite) => {
    return (
      <div className="star-icon" onClick={() => handleFavourite(favourite)}>
      <span className="material-icons">star_rate</span>
    </div>
    )
  }

  const BusinessComponent = () => {
    return props.business.map((business) => {
      return (
        <div className="Business">
          <div className="image-container">
            <img src={business.imageSrc} alt="" />
          </div>
          <div className="title-favourite">
            <h2>{business.name}</h2>
            {isLoggedIn ? <StarButton favourite={business.id}/> : null}
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
