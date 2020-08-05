import React, { useState, useContext } from "react";
import axios from "axios";

import "./Favourites.scss";
import { FavHeader } from "./FavHeader/FavHeader";
import { FavBusiness } from "./FavBusiness/FavBusiness";
import { LoginContext } from "../context/LoginState";

export const Favourites = (props) => {
  const { email } = useContext(LoginContext);

  const getBusiness = async () => {
    console.log("in getBusiness");
    const favourites = await axios.post("/favourites", { email: email });
    const idList = favourites.data.favouritesId[0].favourites;
    console.log(idList);
    try {
      console.log("in try statement");
      const map = await Promise.all(idList.map(
         (businessId) =>  search(businessId)
      ))
      console.log(map); 
      setBusiness(map);
    } catch (err) {
      console.log("in catch statement");
    }
  };

  const search = async(businessId) => {
    console.log('in search function')
  const response = await axios.post("/searchById", { id: businessId });
  console.log(response.data.business);
  return response.data.business;
}

  const [business, setBusiness] = useState(() => getBusiness());

  return (
    <div className="Fav-main">
      <FavHeader setFavouritesStatus={props.setFavouritesStatus} />
      <FavBusiness business={business}/>
    </div>
  );
};
