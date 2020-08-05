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
    setBusiness(idList);
  };

  const [business, setBusiness] = useState(() => getBusiness());

  return (
    <div className="Fav-main">
      <FavHeader setFavouritesStatus={props.setFavouritesStatus} />
      <FavBusiness business={business}/>
    </div>
  );
};
