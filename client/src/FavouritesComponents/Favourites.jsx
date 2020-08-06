import React from "react";

import "./Favourites.scss";
import { FavHeader } from "./FavHeader/FavHeader";
import { FavBusiness } from "./FavBusiness/FavBusiness";

export const Favourites = (props) => {

  return (
    <div className="Fav-main">
      <FavHeader setFavouritesStatus={props.setFavouritesStatus} />
      <FavBusiness />
    </div>
  );
};
