import React, { useState, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../../context/LoginState";
import "./FavBusiness.scss";

export const FavBusiness = (props) => {
  const { email } = useContext(LoginContext);

  const getBusiness = async () => {
    console.log("in getBusiness");
    const favourites = await axios.post("/favourites", { email: email });
    const idList = favourites.data.favouritesId[0].favourites;
    console.log(idList);
    setBusiness(idList);
  };

  const [business, setBusiness] = useState(() => getBusiness());

  const BusinessComponent = (props) => {
    console.log("in BusinessComponent function");
    console.log("business length: " + business.length);
    if (business.length === undefined) {
      console.log("in if statement");
      return (
        <div>
          <h1>nothing</h1>
        </div>
      );
    } else {
      console.log("else statement");
      console.log("business state: " + business);
      return business.map((business) => {
        return (
          <div className="Business">
            <div className="image-container">
              <img src={business.imageSrc} alt="" />
            </div>
            <div className="title-favourite">
              <h2>{business.name}</h2>
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
    }
  };

  const Empty = () => {
    console.log("In Empty function");
    return (
      <div>
        <h1>Empty</h1>
      </div>
    );
  };

  return (
    <div id="Fav-Business" className="Fav-BusinessList">
      <BusinessComponent />
    </div>
  );
};
