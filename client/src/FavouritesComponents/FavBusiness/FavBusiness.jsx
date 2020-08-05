import React, { useState, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../../context/LoginState";
import "./FavBusiness.scss";

export const FavBusiness = (props) => {
  const { email } = useContext(LoginContext);

  const BusinessComponent = (props) => {
    console.log("in BusinessComponent function");
    console.log("business length: " + props.business.length);
    if (props.business.length === undefined) {
      console.log("in if statement");
      return (
        <div>
          <h1>nothing</h1>
        </div>
      );
    } else {
      console.log("else statement");
      console.log("business state: " + props.business);
      return props.business.map((business) => {
        return (
          <div className="Business">
            <div className="image-container">
              <img src={business.image_url} alt="" />
            </div>
            <div className="title-favourite">
              <h2>{business.name}</h2>
            </div>
            <div className="Business-information">
              <div className="Business-address">
                <p>{business.location.address1}</p>
                <p>{business.location.city}</p>
                <p>{business.location.zip_code}</p>
              </div>
              <div className="Business-reviews">
                <h3>{business.categories[0].title}</h3>
                <h3 className="rating">{business.rating}</h3>
                <p>{business.review_count}</p>
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
      <BusinessComponent business={props.business}/>
    </div>
  );
};
